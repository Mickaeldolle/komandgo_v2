from decimal import Decimal

from django.conf import settings
from django.db import models
from django.db.models import Q

from apps.catalog.models import Product, ProductOption
from apps.restaurants.models import Restaurant


class Cart(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Actif"
        CONVERTED = "converted", "Converti"
        ABANDONED = "abandoned", "Abandonné"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="carts",
        null=True,
        blank=True,
    )
    session_key = models.CharField(max_length=40, blank=True, db_index=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT, related_name="carts")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(user__isnull=False) | ~Q(session_key=""),
                name="cart_has_user_or_session",
            ),
            models.UniqueConstraint(
                fields=("user",),
                condition=Q(status="active", user__isnull=False),
                name="one_active_cart_per_user",
            ),
            models.UniqueConstraint(
                fields=("session_key",),
                condition=Q(status="active") & ~Q(session_key=""),
                name="one_active_cart_per_session",
            ),
        ]
        indexes = [models.Index(fields=("status", "updated_at"))]

    @property
    def subtotal(self) -> Decimal:
        return sum((item.line_total for item in self.items.all()), Decimal("0.00"))

    def __str__(self) -> str:
        owner = self.user.email if self.user_id else self.session_key[:8]
        return f"Panier {self.pk} · {owner}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="cart_items")
    quantity = models.PositiveSmallIntegerField(default=1)
    fingerprint = models.CharField(max_length=64)
    product_name = models.CharField(max_length=100)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(quantity__gte=1), name="cart_item_quantity_positive"
            ),
            models.CheckConstraint(condition=Q(quantity__lte=99), name="cart_item_quantity_max_99"),
            models.CheckConstraint(
                condition=Q(unit_price__gte=0),
                name="cart_item_unit_price_non_negative",
            ),
            models.UniqueConstraint(
                fields=("cart", "fingerprint"),
                name="unique_configured_product_per_cart",
            ),
        ]

    @property
    def line_total(self) -> Decimal:
        return self.unit_price * self.quantity

    def __str__(self) -> str:
        return f"{self.quantity} × {self.product_name}"


class CartItemOption(models.Model):
    item = models.ForeignKey(CartItem, on_delete=models.CASCADE, related_name="selections")
    option = models.ForeignKey(ProductOption, on_delete=models.PROTECT, related_name="+")
    group_name = models.CharField(max_length=80)
    option_name = models.CharField(max_length=80)
    price_delta = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("item", "option"),
                name="unique_option_per_cart_item",
            ),
            models.CheckConstraint(
                condition=Q(price_delta__gte=0),
                name="cart_option_price_non_negative",
            ),
        ]
