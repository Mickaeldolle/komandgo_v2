from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order
from .serializers import CheckoutSerializer, OrderSerializer
from .services import checkout


class OrderListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(operation_id="orders_list", responses=OrderSerializer(many=True))
    def get(self, request):
        orders = (
            Order.objects.filter(user=request.user)
            .select_related("restaurant")
            .prefetch_related("items__selections")
        )
        return Response(OrderSerializer(orders, many=True).data)

    @extend_schema(
        operation_id="orders_checkout",
        request=CheckoutSerializer,
        responses={200: OrderSerializer, 201: OrderSerializer},
        parameters=[
            OpenApiParameter(
                name="Idempotency-Key",
                type=str,
                location=OpenApiParameter.HEADER,
                required=True,
                description="Clé unique du client pour rendre le checkout idempotent.",
            )
        ],
    )
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order, created = checkout(
            request,
            idempotency_key=request.headers.get("Idempotency-Key"),
            **serializer.validated_data,
        )
        response_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(OrderSerializer(order).data, status=response_status)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "public_id"

    def get_queryset(self):
        return (
            Order.objects.filter(user=self.request.user)
            .select_related("restaurant")
            .prefetch_related("items__selections")
        )
