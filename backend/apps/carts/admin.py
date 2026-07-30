from django.contrib import admin

from apps.restaurants.admin_mixins import RestaurantOwnedAdminMixin

from .models import Cart, CartItem, CartItemOption


class CartItemOptionInline(admin.TabularInline):
    model = CartItemOption
    extra = 0
    readonly_fields = ("option", "group_name", "option_name", "price_delta")
    can_delete = False


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ("product_name", "quantity", "unit_price", "note")
    readonly_fields = fields
    can_delete = False


@admin.register(Cart)
class CartAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "restaurant__owner"
    list_display = ("id", "user", "restaurant", "status", "updated_at")
    list_filter = (
        "status",
        ("restaurant", admin.RelatedOnlyFieldListFilter),
    )
    search_fields = ("user__email", "session_key", "restaurant__name")
    readonly_fields = ("user", "session_key", "restaurant", "status", "created_at", "updated_at")
    list_select_related = ("user", "restaurant")
    inlines = (CartItemInline,)


@admin.register(CartItem)
class CartItemAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "cart__restaurant__owner"
    list_display = ("product_name", "cart", "quantity", "unit_price", "updated_at")
    search_fields = ("product_name", "cart__user__email")
    list_select_related = ("cart", "cart__restaurant")
    readonly_fields = (
        "cart",
        "product",
        "quantity",
        "fingerprint",
        "product_name",
        "unit_price",
        "note",
        "created_at",
        "updated_at",
    )
    inlines = (CartItemOptionInline,)
