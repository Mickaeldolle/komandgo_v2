from django.contrib import admin

from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "city",
        "postcode",
        "is_open",
        "is_active",
        "delivery_enabled",
        "pickup_enabled",
    )
    list_filter = (
        "is_active",
        "is_open",
        "delivery_enabled",
        "pickup_enabled",
        "onsite_enabled",
        "city",
    )
    search_fields = ("name", "city", "postcode", "owner__email")
    autocomplete_fields = ("owner",)
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("id", "created_at", "updated_at")
    list_select_related = ("owner",)
    actions = ("open_restaurants", "close_restaurants")

    @admin.action(description="Ouvrir les restaurants sélectionnés")
    def open_restaurants(self, request, queryset):
        queryset.update(is_open=True)

    @admin.action(description="Fermer les restaurants sélectionnés")
    def close_restaurants(self, request, queryset):
        queryset.update(is_open=False)
