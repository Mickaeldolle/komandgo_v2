from django.db import models
from django.db.models import F, Q

from apps.restaurants.models import Restaurant


class Category(models.Model):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="categories",
    )
    name = models.CharField(max_length=80)
    slug = models.SlugField(max_length=90)
    description = models.CharField(max_length=240, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    position = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("position", "name")
        constraints = [
            models.UniqueConstraint(
                fields=("restaurant", "slug"),
                name="unique_category_slug_per_restaurant",
            ),
            models.UniqueConstraint(
                fields=("restaurant", "name"),
                name="unique_category_name_per_restaurant",
            ),
        ]
        indexes = [models.Index(fields=("restaurant", "is_active", "position"))]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return f"{self.restaurant.name} · {self.name}"


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=110)
    description = models.TextField(max_length=800, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(max_length=500, blank=True)
    allergens = models.CharField(max_length=300, blank=True)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    position = models.PositiveSmallIntegerField(default=0)
    delivery_enabled = models.BooleanField(default=True)
    pickup_enabled = models.BooleanField(default=True)
    onsite_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("position", "name")
        constraints = [
            models.UniqueConstraint(
                fields=("category", "slug"),
                name="unique_product_slug_per_category",
            ),
            models.CheckConstraint(condition=Q(price__gte=0), name="product_price_non_negative"),
        ]
        indexes = [models.Index(fields=("category", "is_active", "is_available", "position"))]

    @property
    def restaurant(self) -> Restaurant:
        return self.category.restaurant

    def __str__(self) -> str:
        return f"{self.category.restaurant.name} · {self.name}"


class OptionGroup(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="option_groups")
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=240, blank=True)
    minimum = models.PositiveSmallIntegerField(default=0)
    maximum = models.PositiveSmallIntegerField(default=1)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("position", "id")
        constraints = [
            models.CheckConstraint(
                condition=Q(maximum__gte=F("minimum")),
                name="option_group_maximum_gte_minimum",
            ),
            models.UniqueConstraint(
                fields=("product", "name"),
                name="unique_option_group_name_per_product",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.product.name} · {self.name}"


class ProductOption(models.Model):
    group = models.ForeignKey(OptionGroup, on_delete=models.CASCADE, related_name="options")
    name = models.CharField(max_length=80)
    price_delta = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_available = models.BooleanField(default=True)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("position", "id")
        constraints = [
            models.CheckConstraint(
                condition=Q(price_delta__gte=0),
                name="product_option_price_non_negative",
            ),
            models.UniqueConstraint(
                fields=("group", "name"),
                name="unique_option_name_per_group",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.group.name} · {self.name}"
