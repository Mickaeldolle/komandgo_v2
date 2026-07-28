from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import AddCartItemSerializer, CartSerializer, UpdateCartItemSerializer
from .services import add_item, clear_cart, find_current_cart, remove_item, update_item


def empty_cart() -> dict:
    return {
        "id": None,
        "restaurant": None,
        "status": "active",
        "items": [],
        "subtotal": "0.00",
        "updated_at": None,
    }


class CurrentCartView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(operation_id="cart_retrieve", responses=CartSerializer)
    def get(self, request):
        cart = find_current_cart(request)
        return Response(CartSerializer(cart).data if cart else empty_cart())

    @extend_schema(
        operation_id="cart_item_add",
        request=AddCartItemSerializer,
        responses={201: CartSerializer},
    )
    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = add_item(request, **serializer.validated_data)
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    @extend_schema(operation_id="cart_clear", request=None, responses={204: None})
    def delete(self, request):
        clear_cart(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CartItemView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        operation_id="cart_item_update",
        request=UpdateCartItemSerializer,
        responses=CartSerializer,
    )
    def patch(self, request, item_id: int):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = update_item(request, item_id, serializer.validated_data["quantity"])
        return Response(CartSerializer(cart).data)

    @extend_schema(operation_id="cart_item_remove", responses=CartSerializer)
    def delete(self, request, item_id: int):
        cart = remove_item(request, item_id)
        return Response(CartSerializer(cart).data if cart else empty_cart())
