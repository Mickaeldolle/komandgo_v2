import uuid

from django.conf import settings
from django.db import models
from django.db.models import Q


class Restaurant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="restaurants",
        null=True,
        blank=True,
    )
    slug = models.SlugField(max_length=80, unique=True)
    name = models.CharField(max_length=80)
    description = models.TextField(max_length=600)
    cuisine = models.CharField(max_length=60, blank=True)
    address = models.CharField(max_length=180)
    city = models.CharField(max_length=80)
    postcode = models.CharField(max_length=10, db_index=True)
    phone = models.CharField(max_length=20, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    banner_url = models.URLField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True, db_index=True)
    is_open = models.BooleanField(default=True, db_index=True)
    delivery_enabled = models.BooleanField(default=False)
    pickup_enabled = models.BooleanField(default=True)
    onsite_enabled = models.BooleanField(default=False)
    minimum_order = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)
        constraints = [
            models.CheckConstraint(
                condition=Q(minimum_order__gte=0),
                name="restaurant_minimum_order_non_negative",
            ),
            models.CheckConstraint(
                condition=Q(delivery_fee__gte=0),
                name="restaurant_delivery_fee_non_negative",
            ),
        ]
        indexes = [
            models.Index(fields=("is_active", "is_open", "name")),
            models.Index(fields=("postcode", "is_active")),
        ]

    def __str__(self) -> str:
        return self.name
