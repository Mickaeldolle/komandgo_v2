from django.contrib import admin

from .admin_mixins import RestaurantOwnedAdminMixin
from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(RestaurantOwnedAdminMixin, admin.ModelAdmin):
    restaurant_owner_lookup = "owner"
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

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = list(super().get_readonly_fields(request, obj))
        if not request.user.is_superuser:
            readonly_fields.append("owner")
        return tuple(readonly_fields)

    def get_autocomplete_fields(self, request):
        if not request.user.is_superuser:
            return ()
        return super().get_autocomplete_fields(request)

    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser:
            if change:
                obj.owner_id = Restaurant.objects.only("owner_id").get(pk=obj.pk).owner_id
            else:
                obj.owner = request.user
        super().save_model(request, obj, form, change)

    @admin.action(description="Ouvrir les restaurants sélectionnés")
    def open_restaurants(self, request, queryset):
        queryset.update(is_open=True)

    @admin.action(description="Fermer les restaurants sélectionnés")
    def close_restaurants(self, request, queryset):
        queryset.update(is_open=False)
