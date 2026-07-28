from django.urls import path

from .views import CartItemView, CurrentCartView

urlpatterns = [
    path("", CurrentCartView.as_view(), name="current-cart"),
    path("items/<int:item_id>/", CartItemView.as_view(), name="cart-item"),
]
