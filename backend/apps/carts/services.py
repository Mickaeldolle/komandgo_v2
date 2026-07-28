from __future__ import annotations

import hashlib
from collections import Counter
from decimal import Decimal

from django.db import transaction
from rest_framework.exceptions import APIException, ValidationError

from apps.catalog.models import Product, ProductOption

from .models import Cart, CartItem, CartItemOption


class CartConflict(APIException):
    status_code = 409
    default_code = "cart_restaurant_conflict"
    default_detail = (
        "Ce panier contient déjà des produits d’un autre restaurant. Videz-le avant de continuer."
    )


def ensure_session_key(request) -> str:
    if request.session.session_key is None:
        request.session.create()
    return str(request.session.session_key)


def find_current_cart(request, *, lock: bool = False) -> Cart | None:
    queryset = Cart.objects.filter(status=Cart.Status.ACTIVE).prefetch_related(
        "items__selections", "items__product", "restaurant"
    )
    if lock:
        queryset = queryset.select_for_update()
    if request.user.is_authenticated:
        return queryset.filter(user=request.user).first()
    cart_id = request.session.get("cart_id")
    if cart_id:
        cart = queryset.filter(pk=cart_id).first()
        if cart:
            return cart
    return queryset.filter(session_key=ensure_session_key(request)).first()


def _selection_data(product: Product, option_ids: list[int]) -> list[ProductOption]:
    unique_ids = set(option_ids)
    if len(unique_ids) != len(option_ids):
        raise ValidationError({"option_ids": "Une option ne peut être sélectionnée qu’une fois."})

    groups = list(product.option_groups.prefetch_related("options").all())
    valid_options: dict[int, ProductOption] = {}
    group_by_option: dict[int, int] = {}
    for group in groups:
        for option in group.options.all():
            if option.is_available:
                valid_options[option.id] = option
                group_by_option[option.id] = group.id

    unknown = unique_ids - valid_options.keys()
    if unknown:
        raise ValidationError({"option_ids": "Une option est invalide ou indisponible."})

    counts = Counter(group_by_option[option_id] for option_id in unique_ids)
    for group in groups:
        count = counts[group.id]
        if count < group.minimum or count > group.maximum:
            raise ValidationError(
                {
                    "option_ids": (
                        f"« {group.name} » exige entre {group.minimum} et {group.maximum} choix."
                    )
                }
            )
    return [valid_options[option_id] for option_id in sorted(unique_ids)]


def _fingerprint(product_id: int, option_ids: list[int], note: str) -> str:
    raw = f"{product_id}:{','.join(map(str, sorted(option_ids)))}:{note.strip()}"
    return hashlib.sha256(raw.encode()).hexdigest()


@transaction.atomic
def add_item(
    request,
    *,
    product_id: int,
    quantity: int,
    option_ids: list[int],
    note: str = "",
) -> Cart:
    if quantity < 1 or quantity > 99:
        raise ValidationError({"quantity": "La quantité doit être comprise entre 1 et 99."})

    try:
        product = (
            Product.objects.select_related("category__restaurant")
            .prefetch_related("option_groups__options")
            .get(pk=product_id, is_active=True, is_available=True)
        )
    except Product.DoesNotExist as exc:
        raise ValidationError({"product_id": "Ce produit est indisponible."}) from exc

    options = _selection_data(product, option_ids)
    cart = find_current_cart(request, lock=True)
    if cart and cart.restaurant_id != product.category.restaurant_id:
        raise CartConflict()
    if cart is None:
        identity = (
            {"user": request.user, "session_key": ""}
            if request.user.is_authenticated
            else {"session_key": ensure_session_key(request)}
        )
        cart = Cart.objects.create(restaurant=product.category.restaurant, **identity)
        if not request.user.is_authenticated:
            request.session["cart_id"] = cart.id

    unit_price = product.price + sum(
        (option.price_delta for option in options),
        Decimal("0.00"),
    )
    fingerprint = _fingerprint(product.id, option_ids, note)
    item = CartItem.objects.filter(cart=cart, fingerprint=fingerprint).first()
    if item:
        item.quantity = min(99, item.quantity + quantity)
        item.product_name = product.name
        item.unit_price = unit_price
        item.save(update_fields=("quantity", "product_name", "unit_price", "updated_at"))
    else:
        item = CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=quantity,
            fingerprint=fingerprint,
            product_name=product.name,
            unit_price=unit_price,
            note=note.strip(),
        )
        CartItemOption.objects.bulk_create(
            [
                CartItemOption(
                    item=item,
                    option=option,
                    group_name=option.group.name,
                    option_name=option.name,
                    price_delta=option.price_delta,
                )
                for option in options
            ]
        )
    return find_current_cart(request) or cart


@transaction.atomic
def update_item(request, item_id: int, quantity: int) -> Cart:
    if quantity < 1 or quantity > 99:
        raise ValidationError({"quantity": "La quantité doit être comprise entre 1 et 99."})
    cart = find_current_cart(request, lock=True)
    if cart is None:
        raise ValidationError({"item": "Le panier est vide."})
    try:
        item = cart.items.select_for_update().get(pk=item_id)
    except CartItem.DoesNotExist as exc:
        raise ValidationError({"item": "Cette ligne n’existe pas."}) from exc
    item.quantity = quantity
    item.save(update_fields=("quantity", "updated_at"))
    return find_current_cart(request) or cart


@transaction.atomic
def remove_item(request, item_id: int) -> Cart | None:
    cart = find_current_cart(request, lock=True)
    if cart is None:
        return None
    deleted, _ = cart.items.filter(pk=item_id).delete()
    if not deleted:
        raise ValidationError({"item": "Cette ligne n’existe pas."})
    return find_current_cart(request)


@transaction.atomic
def clear_cart(request) -> None:
    cart = find_current_cart(request, lock=True)
    if cart:
        cart.items.all().delete()
        cart.status = Cart.Status.ABANDONED
        cart.save(update_fields=("status", "updated_at"))
    request.session.pop("cart_id", None)


@transaction.atomic
def merge_session_cart(request, user) -> None:
    cart_id = request.session.get("cart_id")
    if not cart_id:
        return
    guest = Cart.objects.select_for_update().filter(pk=cart_id, status=Cart.Status.ACTIVE).first()
    request.session.pop("cart_id", None)
    if guest is None:
        return
    current = Cart.objects.select_for_update().filter(user=user, status=Cart.Status.ACTIVE).first()
    if current is None:
        guest.user = user
        guest.session_key = ""
        guest.save(update_fields=("user", "session_key", "updated_at"))
        return
    if current.restaurant_id == guest.restaurant_id:
        for item in guest.items.all():
            existing = current.items.filter(fingerprint=item.fingerprint).first()
            if existing:
                existing.quantity = min(99, existing.quantity + item.quantity)
                existing.save(update_fields=("quantity", "updated_at"))
            else:
                selections = list(item.selections.all())
                item.pk = None
                item.cart = current
                item.save()
                CartItemOption.objects.bulk_create(
                    [
                        CartItemOption(
                            item=item,
                            option=selection.option,
                            group_name=selection.group_name,
                            option_name=selection.option_name,
                            price_delta=selection.price_delta,
                        )
                        for selection in selections
                    ]
                )
    guest.status = Cart.Status.ABANDONED
    guest.save(update_fields=("status", "updated_at"))
