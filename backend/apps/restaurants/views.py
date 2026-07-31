from datetime import timedelta

from django.db.models import Prefetch, Sum
from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.catalog.models import Category, Product

from .dashboard_serializers import DashboardOrderSerializer
from .models import Restaurant
from .permissions import IsRestaurateur
from .serializers import RestaurantDetailSerializer, RestaurantListSerializer


class RestaurateurDashboardView(APIView):
    permission_classes = [IsRestaurateur]

    def get(self, request):
        from apps.orders.models import Order

        restaurants = Restaurant.objects.filter(owner=request.user, is_active=True)
        orders = (
            Order.objects.filter(restaurant__in=restaurants)
            .select_related("restaurant")
            .prefetch_related("items__selections")
        )
        month = timezone.now() - timedelta(days=30)
        recent = orders.filter(created_at__gte=month)
        status_counts = {key: orders.filter(status=key).count() for key, _ in Order.Status.choices}
        products = (
            recent.values("items__product_name")
            .annotate(quantity=Sum("items__quantity"))
            .order_by("-quantity")[:5]
        )
        return Response(
            {
                "restaurants": [
                    {
                        "id": str(r.id),
                        "slug": r.slug,
                        "name": r.name,
                        "address": r.address,
                        "city": r.city,
                        "postcode": r.postcode,
                        "phone": r.phone,
                        "is_open": r.is_open,
                        "is_active": r.is_active,
                    }
                    for r in restaurants
                ],
                "orders": DashboardOrderSerializer(orders[:100], many=True).data,
                "stats": {
                    "orders_today": orders.filter(created_at__date=timezone.localdate()).count(),
                    "orders_month": recent.count(),
                    "completed": status_counts.get(Order.Status.COMPLETED, 0),
                    "abandoned": status_counts.get(Order.Status.CANCELLED, 0),
                    "by_status": status_counts,
                    "top_products": [
                        {"name": p["items__product_name"], "quantity": p["quantity"]}
                        for p in products
                    ],
                },
            }
        )


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
