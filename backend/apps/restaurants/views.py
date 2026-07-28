from django.db.models import Prefetch
from rest_framework import generics, permissions

from apps.catalog.models import Category, Product

from .models import Restaurant
from .serializers import RestaurantDetailSerializer, RestaurantListSerializer


class RestaurantListView(generics.ListAPIView):
    serializer_class = RestaurantListSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ("is_open", "city", "postcode", "delivery_enabled", "pickup_enabled")
    search_fields = ("name", "description", "cuisine", "city", "postcode")
    ordering_fields = ("name", "created_at")
    ordering = ("name",)

    def get_queryset(self):
        return Restaurant.objects.filter(is_active=True)


class RestaurantDetailView(generics.RetrieveAPIView):
    serializer_class = RestaurantDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        products = Product.objects.filter(is_active=True).prefetch_related("option_groups__options")
        categories = Category.objects.filter(is_active=True).prefetch_related(
            Prefetch("products", queryset=products)
        )
        return Restaurant.objects.filter(is_active=True).prefetch_related(
            Prefetch("categories", queryset=categories)
        )


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = __import__(
        "apps.catalog.serializers", fromlist=["ProductSerializer"]
    ).ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    lookup_url_kwarg = "product_slug"

    def get_queryset(self):
        return (
            Product.objects.filter(
                is_active=True,
                category__restaurant__slug=self.kwargs["slug"],
                category__restaurant__is_active=True,
            )
            .select_related("category", "category__restaurant")
            .prefetch_related("option_groups__options")
        )
