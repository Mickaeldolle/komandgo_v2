from rest_framework import serializers

from .models import Category, OptionGroup, Product, ProductOption


class ProductOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOption
        fields = ("id", "name", "price_delta", "is_available")


class OptionGroupSerializer(serializers.ModelSerializer):
    options = ProductOptionSerializer(many=True, read_only=True)

    class Meta:
        model = OptionGroup
        fields = ("id", "name", "description", "minimum", "maximum", "options")


class ProductSerializer(serializers.ModelSerializer):
    option_groups = OptionGroupSerializer(many=True, read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    restaurant_slug = serializers.CharField(source="category.restaurant.slug", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "slug",
            "name",
            "description",
            "price",
            "image_url",
            "allergens",
            "is_available",
            "delivery_enabled",
            "pickup_enabled",
            "onsite_enabled",
            "category_slug",
            "restaurant_slug",
            "option_groups",
        )


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ("id", "slug", "name", "description", "image_url", "products")
