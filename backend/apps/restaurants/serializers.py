from rest_framework import serializers

from apps.catalog.serializers import CategorySerializer

from .models import Restaurant


class RestaurantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = (
            "id",
            "slug",
            "name",
            "description",
            "cuisine",
            "city",
            "postcode",
            "image_url",
            "is_open",
            "delivery_enabled",
            "pickup_enabled",
            "onsite_enabled",
            "minimum_order",
            "delivery_fee",
        )


class RestaurantDetailSerializer(RestaurantListSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta(RestaurantListSerializer.Meta):
        fields = RestaurantListSerializer.Meta.fields + (
            "address",
            "phone",
            "banner_url",
            "categories",
        )
