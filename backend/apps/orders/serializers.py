from rest_framework import serializers

from .models import Order, OrderItem, OrderItemOption


class OrderItemOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemOption
        fields = ("group_name", "option_name", "price_delta")


class OrderItemSerializer(serializers.ModelSerializer):
    selections = OrderItemOptionSerializer(many=True, read_only=True)

    class Meta:
        model = OrderItem
        fields = (
            "product_name",
            "quantity",
            "unit_price",
            "line_total",
            "note",
            "selections",
        )


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    restaurant = serializers.CharField(source="restaurant.name", read_only=True)
    restaurant_slug = serializers.CharField(source="restaurant.slug", read_only=True)

    class Meta:
        model = Order
        fields = (
            "public_id",
            "restaurant",
            "restaurant_slug",
            "status",
            "fulfillment",
            "subtotal",
            "delivery_fee",
            "total",
            "delivery_address",
            "comment",
            "items",
            "created_at",
            "updated_at",
        )


class CheckoutSerializer(serializers.Serializer):
    fulfillment = serializers.ChoiceField(choices=Order.Fulfillment.choices)
    delivery_address = serializers.CharField(max_length=300, allow_blank=True, default="")
    comment = serializers.CharField(max_length=500, allow_blank=True, default="")
    accepted_total = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=0)
