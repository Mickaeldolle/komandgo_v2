from __future__ import annotations


class RestaurantOwnedAdminMixin:
    restaurant_owner_lookup = ""
    owned_foreign_keys: dict[str, str] = {}

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(**{self.restaurant_owner_lookup: request.user}).distinct()

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        owner_lookup = self.owned_foreign_keys.get(db_field.name)
        if owner_lookup and not request.user.is_superuser:
            related_model = db_field.remote_field.model
            kwargs["queryset"] = related_model._default_manager.filter(
                **{owner_lookup: request.user}
            ).distinct()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def _owns_object(self, request, obj) -> bool:
        if obj is None or request.user.is_superuser:
            return True
        return self.model._default_manager.filter(
            pk=obj.pk,
            **{self.restaurant_owner_lookup: request.user},
        ).exists()

    def has_view_permission(self, request, obj=None):
        return super().has_view_permission(request, obj) and self._owns_object(request, obj)

    def has_change_permission(self, request, obj=None):
        return super().has_change_permission(request, obj) and self._owns_object(request, obj)

    def has_delete_permission(self, request, obj=None):
        return super().has_delete_permission(request, obj) and self._owns_object(request, obj)
