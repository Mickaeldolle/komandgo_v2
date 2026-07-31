from rest_framework import serializers

from apps.catalog.models import Product
from apps.orders.models import Order


class DashboardRestaurantSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    slug = serializers.CharField()
    name = serializers.CharField()
    address = serializers.CharField()
    city = serializers.CharField()
    postcode = serializers.CharField()
    phone = serializers.CharField()
    is_open = serializers.BooleanField()
    is_active = serializers.BooleanField()


class DashboardOrderSerializer(serializers.ModelSerializer):
    restaurant = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    has_issue = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            "public_id",
            "restaurant",
            "status",
            "fulfillment",
            "subtotal",
            "delivery_fee",
            "total",
            "customer",
            "delivery_address",
            "comment",
            "has_issue",
            "items",
            "created_at",
            "updated_at",
        )

    def get_restaurant(self, order: Order) -> dict[str, str]:
        return {
            "id": str(order.restaurant_id),
            "slug": order.restaurant.slug,
            "name": order.restaurant.name,
        }

    def get_customer(self, order: Order) -> dict[str, object]:
        return {
            "id": order.user_id,
            "name": order.customer_name,
            "email": order.customer_email,
            "phone": order.customer_phone,
        }

    def get_items(self, order: Order) -> list[dict[str, object]]:
        return [
            {
                "product_name": item.product_name,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "line_total": item.line_total,
                "note": item.note,
                "selections": [
                    {
                        "group_name": selection.group_name,
                        "option_name": selection.option_name,
                        "price_delta": selection.price_delta,
                    }
                    for selection in item.selections.all()
                ],
            }
            for item in order.items.all()
        ]

    def get_has_issue(self, order: Order) -> bool:
        return order.status == Order.Status.CANCELLED or bool(order.comment.strip())


class DashboardCustomerSummarySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    order_count = serializers.IntegerField()
    completed_orders = serializers.IntegerField()
    abandoned_orders = serializers.IntegerField()
    issue_count = serializers.IntegerField()
    total_spent = serializers.DecimalField(max_digits=12, decimal_places=2)
    last_order_at = serializers.DateTimeField()


class DashboardProductSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.UUIDField(source="category.restaurant_id")
    restaurant_name = serializers.CharField(source="category.restaurant.name")
    category_name = serializers.CharField(source="category.name")
    sold_quantity = serializers.IntegerField()
    order_count = serializers.IntegerField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "restaurant_id",
            "restaurant_name",
            "category_name",
            "price",
            "is_active",
            "is_available",
            "sold_quantity",
            "order_count",
        )
