from django.urls import path

from .views import OrderDetailView, OrderListCreateView

urlpatterns = [
    path("", OrderListCreateView.as_view(), name="order-list-create"),
    path("<uuid:public_id>/", OrderDetailView.as_view(), name="order-detail"),
]
