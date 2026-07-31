from rest_framework.permissions import BasePermission


class IsRestaurateur(BasePermission):
    message = "L’espace restaurateur est réservé aux membres du groupe Restaurateurs."
    code = "restaurateur_required"

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                request.user.is_superuser
                or request.user.groups.filter(name="Restaurateurs").exists()
            )
        )
