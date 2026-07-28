from django.contrib import admin

from .models import Category, OptionGroup, Product, ProductOption


class ProductOptionInline(admin.TabularInline):
    model = ProductOption
    extra = 0
    fields = ("name", "price_delta", "is_available", "position")


@admin.register(OptionGroup)
class OptionGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "product", "minimum", "maximum", "position")
    list_filter = ("product__category__restaurant",)
    search_fields = ("name", "product__name", "product__category__restaurant__name")
    autocomplete_fields = ("product",)
    inlines = (ProductOptionInline,)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "restaurant", "position", "is_active")
    list_filter = ("is_active", "restaurant")
    search_fields = ("name", "restaurant__name")
    autocomplete_fields = ("restaurant",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("restaurant", "position")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "is_available", "is_active", "position")
    list_filter = ("is_active", "is_available", "category__restaurant", "category")
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
