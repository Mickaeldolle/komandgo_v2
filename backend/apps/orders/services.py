from __future__ import annotations

from decimal import Decimal

from django.db import transaction
from rest_framework.exceptions import APIException, ValidationError

from apps.accounts.models import User
from apps.carts.models import Cart
from apps.carts.services import _selection_data, find_current_cart

from .models import Order, OrderItem, OrderItemOption


class PriceChanged(APIException):
    status_code = 409
    default_code = "price_changed"
    default_detail = "Le catalogue a changé. Vérifiez le nouveau total avant de commander."


class ItemUnavailable(APIException):
    status_code = 409
    default_code = "item_unavailable"
    default_detail = "Un produit ou une option du panier n’est plus disponible."


def _validate_fulfillment(cart: Cart, fulfillment: str) -> Decimal:
    restaurant = cart.restaurant
    enabled = {
        Order.Fulfillment.PICKUP: restaurant.pickup_enabled,
        Order.Fulfillment.DELIVERY: restaurant.delivery_enabled,
        Order.Fulfillment.ONSITE: restaurant.onsite_enabled,
    }
    if not enabled.get(fulfillment, False):
        raise ValidationError({"fulfillment": "Ce mode de commande n’est pas disponible."})
    subtotal = cart.subtotal
    if fulfillment == Order.Fulfillment.DELIVERY:
        if subtotal < restaurant.minimum_order:
            raise ValidationError(
                {
                    "fulfillment": (
                        f"Le minimum de livraison est de {restaurant.minimum_order:.2f} €."
                    )
                }
            )
        return restaurant.delivery_fee
    return Decimal("0.00")


@transaction.atomic
def checkout(
    request,
    *,
    fulfillment: str,
    delivery_address: str,
    comment: str,
    accepted_total: Decimal,
    idempotency_key: str | None,
) -> tuple[Order, bool]:
    if not idempotency_key:
        raise ValidationError({"idempotency_key": "L’en-tête Idempotency-Key est obligatoire."})
    key = idempotency_key
    User.objects.select_for_update().only("pk").get(pk=request.user.pk)
    existing = Order.objects.filter(idempotency_key=key, user=request.user).first()
    if existing:
        return existing, False

    cart = find_current_cart(request, lock=True)
    if cart is None or not cart.items.exists():
        raise ValidationError({"cart": "Le panier est vide."})

    for item in cart.items.select_related("product").prefetch_related("selections__option"):
        product = item.product
        if not product.is_active or not product.is_available:
            raise ItemUnavailable()
        options = list(item.selections.all())
        try:
            current_options = _selection_data(
                product, [selection.option_id for selection in options]
            )
        except ValidationError as exc:
            raise ItemUnavailable() from exc
        item.product_name = product.name
        item.unit_price = product.price + sum(
            (option.price_delta for option in current_options),
            Decimal("0.00"),
        )
        item.save(update_fields=("product_name", "unit_price", "updated_at"))

    subtotal = cart.subtotal
    delivery_fee = _validate_fulfillment(cart, fulfillment)
    total = subtotal + delivery_fee
    if accepted_total != total:
        raise PriceChanged()
    if fulfillment == Order.Fulfillment.DELIVERY and not delivery_address.strip():
        raise ValidationError({"delivery_address": "Une adresse de livraison est obligatoire."})

    full_name = f"{request.user.first_name} {request.user.last_name}".strip()
    order = Order.objects.create(
        idempotency_key=key,
        user=request.user,
        restaurant=cart.restaurant,
        fulfillment=fulfillment,
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        total=total,
        customer_name=full_name or request.user.email,
        customer_email=request.user.email,
        customer_phone=request.user.phone,
        delivery_address=delivery_address.strip(),
        comment=comment.strip(),
    )
    for cart_item in cart.items.prefetch_related("selections"):
        order_item = OrderItem.objects.create(
            order=order,
            product=cart_item.product,
            product_name=cart_item.product_name,
            quantity=cart_item.quantity,
            unit_price=cart_item.unit_price,
            line_total=cart_item.line_total,
            note=cart_item.note,
        )
        OrderItemOption.objects.bulk_create(
            [
                OrderItemOption(
                    item=order_item,
                    group_name=selection.group_name,
                    option_name=selection.option_name,
                    price_delta=selection.price_delta,
                )
                for selection in cart_item.selections.all()
            ]
        )
    cart.status = Cart.Status.CONVERTED
    cart.save(update_fields=("status", "updated_at"))
    return order, True
