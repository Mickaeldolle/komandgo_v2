from rest_framework import serializers

from .models import Cart, CartItem, CartItemOption


class CartItemOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItemOption
        fields = ("id", "group_name", "option_name", "price_delta")


class CartItemSerializer(serializers.ModelSerializer):
    selections = CartItemOptionSerializer(many=True, read_only=True)
    line_total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    product_slug = serializers.CharField(source="product.slug", read_only=True)
    image_url = serializers.URLField(source="product.image_url", read_only=True)
    is_available = serializers.BooleanField(source="product.is_available", read_only=True)

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product",
            "product_slug",
            "product_name",
            "image_url",
            "is_available",
            "quantity",
            "unit_price",
            "line_total",
            "note",
            "selections",
        )


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    restaurant = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ("id", "restaurant", "status", "items", "subtotal", "updated_at")

    def get_restaurant(self, obj: Cart) -> dict[str, str]:
        return {
            "id": str(obj.restaurant_id),
            "slug": obj.restaurant.slug,
            "name": obj.restaurant.name,
        }


class AddCartItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(min_value=1)
    quantity = serializers.IntegerField(min_value=1, max_value=99, default=1)
    option_ids = serializers.ListField(
        child=serializers.IntegerField(min_value=1),
        allow_empty=True,
        default=list,
    )
    note = serializers.CharField(max_length=300, allow_blank=True, default="")


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1, max_value=99)
