from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class KomandGoUserAdmin(UserAdmin):
    ordering = ("email",)
    list_display = ("email", "first_name", "last_name", "is_staff", "is_active")
    search_fields = ("email", "first_name", "last_name", "phone")
    fieldsets = UserAdmin.fieldsets + (("KomandGo", {"fields": ("phone",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("KomandGo", {"fields": ("email", "first_name", "last_name", "phone")}),
    )
