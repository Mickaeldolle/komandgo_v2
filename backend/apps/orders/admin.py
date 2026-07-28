from django.contrib import admin

from .models import Order, OrderItem, OrderItemOption


class OrderItemOptionInline(admin.TabularInline):
    model = OrderItemOption
    extra = 0
    readonly_fields = ("group_name", "option_name", "price_delta")
    can_delete = False


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ("product_name", "quantity", "unit_price", "line_total", "note")
    readonly_fields = fields
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "short_number",
        "restaurant",
        "customer_email",
        "status",
        "fulfillment",
        "total",
        "created_at",
    )
    list_filter = ("status", "fulfillment", "restaurant", "created_at")
    search_fields = ("public_id", "customer_email", "customer_name", "restaurant__name")
    readonly_fields = (
        "public_id",
        "idempotency_key",
        "user",
        "restaurant",
        "fulfillment",
        "subtotal",
        "delivery_fee",
        "total",
        "customer_name",
        "customer_email",
        "customer_phone",
        "delivery_address",
        "comment",
        "created_at",
        "updated_at",
    )
    inlines = (OrderItemInline,)
    actions = ("confirm_orders", "mark_in_preparation", "mark_ready", "complete_orders")

    @admin.display(description="Commande")
    def short_number(self, obj):
        return str(obj.public_id)[:8].upper()

    @admin.action(description="Confirmer les commandes")
    def confirm_orders(self, request, queryset):
        queryset.filter(status=Order.Status.PENDING).update(status=Order.Status.CONFIRMED)

    @admin.action(description="Passer en préparation")
    def mark_in_preparation(self, request, queryset):
        queryset.filter(status=Order.Status.CONFIRMED).update(status=Order.Status.IN_PREPARATION)

    @admin.action(description="Marquer comme prêtes")
    def mark_ready(self, request, queryset):
        queryset.filter(status=Order.Status.IN_PREPARATION).update(status=Order.Status.READY)

    @admin.action(description="Terminer les commandes")
    def complete_orders(self, request, queryset):
        queryset.filter(status=Order.Status.READY).update(status=Order.Status.COMPLETED)
