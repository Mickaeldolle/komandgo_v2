from django.contrib import admin

from apps.restaurants.admin_mixins import RestaurantOwnedAdminMixin

from .models import Category, OptionGroup, Product, ProductOption


class ProductOptionInline(admin.TabularInline):
    model = ProductOption
    extra = 0
    fields = ("name", "price_delta", "is_available", "position")


@admin.register(OptionGroup)
class OptionGroupAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "product__category__restaurant__owner"
    owned_foreign_keys = {"product": "category__restaurant__owner"}
    list_display = ("name", "product", "minimum", "maximum", "position")
    list_filter = (("product__category__restaurant", admin.RelatedOnlyFieldListFilter),)
    search_fields = ("name", "product__name", "product__category__restaurant__name")
    autocomplete_fields = ("product",)
    list_select_related = ("product", "product__category", "product__category__restaurant")
    inlines = (ProductOptionInline,)


@admin.register(Category)
class CategoryAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "restaurant__owner"
    owned_foreign_keys = {"restaurant": "owner"}
    list_display = ("name", "restaurant", "position", "is_active")
    list_filter = (
        "is_active",
        ("restaurant", admin.RelatedOnlyFieldListFilter),
    )
    search_fields = ("name", "restaurant__name")
    autocomplete_fields = ("restaurant",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("restaurant", "position")
    list_select_related = ("restaurant",)


@admin.register(Product)
class ProductAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "category__restaurant__owner"
    owned_foreign_keys = {"category": "restaurant__owner"}
    list_display = ("name", "category", "price", "is_available", "is_active", "position")
    list_filter = (
        "is_active",
        "is_available",
        ("category__restaurant", admin.RelatedOnlyFieldListFilter),
        ("category", admin.RelatedOnlyFieldListFilter),
    )
    search_fields = ("name", "description", "category__name", "category__restaurant__name")
    autocomplete_fields = ("category",)
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("created_at", "updated_at")
    list_select_related = ("category", "category__restaurant")
    actions = ("mark_available", "mark_unavailable")

    @admin.action(description="Marquer les produits disponibles")
    def mark_available(self, request, queryset):
        queryset.update(is_available=True)

    @admin.action(description="Marquer les produits indisponibles")
    def mark_unavailable(self, request, queryset):
        queryset.update(is_available=False)
