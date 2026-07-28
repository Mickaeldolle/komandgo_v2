from django.urls import path

from .views import ProductDetailView, RestaurantDetailView, RestaurantListView

urlpatterns = [
    path("", RestaurantListView.as_view(), name="restaurant-list"),
    path("<slug:slug>/", RestaurantDetailView.as_view(), name="restaurant-detail"),
    path(
        "<slug:slug>/products/<slug:product_slug>/",
        ProductDetailView.as_view(),
        name="product-detail",
    ),
]
