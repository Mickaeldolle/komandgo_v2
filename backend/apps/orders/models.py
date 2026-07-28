import uuid

from django.conf import settings
from django.db import models
from django.db.models import Q

from apps.catalog.models import Product
from apps.restaurants.models import Restaurant


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "En attente"
        CONFIRMED = "confirmed", "Confirmée"
        IN_PREPARATION = "in_preparation", "En préparation"
        READY = "ready", "Prête"
        COMPLETED = "completed", "Terminée"
        CANCELLED = "cancelled", "Annulée"

    class Fulfillment(models.TextChoices):
        PICKUP = "pickup", "À emporter"
        DELIVERY = "delivery", "Livraison"
        ONSITE = "onsite", "Sur place"

    public_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    idempotency_key = models.CharField(max_length=64)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders"
    )
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT, related_name="orders")
    status = models.CharField(max_length=24, choices=Status.choices, default=Status.PENDING)
    fulfillment = models.CharField(max_length=16, choices=Fulfillment.choices)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    customer_name = models.CharField(max_length=160)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20, blank=True)
    delivery_address = models.CharField(max_length=300, blank=True)
    comment = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        constraints = [
            models.UniqueConstraint(
                fields=("user", "idempotency_key"),
                name="order_user_idempotency_unique",
            ),
            models.CheckConstraint(
                condition=Q(subtotal__gte=0), name="order_subtotal_non_negative"
            ),
            models.CheckConstraint(
                condition=Q(delivery_fee__gte=0),
                name="order_delivery_fee_non_negative",
            ),
            models.CheckConstraint(condition=Q(total__gte=0), name="order_total_non_negative"),
        ]
        indexes = [
            models.Index(fields=("user", "created_at")),
            models.Index(fields=("restaurant", "status", "created_at")),
        ]

    def __str__(self) -> str:
        return f"{str(self.public_id)[:8].upper()} · {self.restaurant.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        related_name="order_items",
        null=True,
        blank=True,
    )
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=300, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(quantity__gte=1), name="order_item_quantity_positive"
            ),
            models.CheckConstraint(
                condition=Q(unit_price__gte=0),
                name="order_item_unit_price_non_negative",
            ),
            models.CheckConstraint(
                condition=Q(line_total__gte=0),
                name="order_item_total_non_negative",
            ),
        ]


class OrderItemOption(models.Model):
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="selections")
    group_name = models.CharField(max_length=80)
    option_name = models.CharField(max_length=80)
    price_delta = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(price_delta__gte=0),
                name="order_option_price_non_negative",
            )
        ]
