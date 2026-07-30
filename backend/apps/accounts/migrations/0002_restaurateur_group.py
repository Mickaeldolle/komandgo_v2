from django.db import migrations

GROUP_NAME = "Restaurateurs"
ROLE_PERMISSIONS = {
    ("restaurants", "restaurant"): ("view", "change"),
    ("catalog", "category"): ("view", "add", "change", "delete"),
    ("catalog", "product"): ("view", "add", "change", "delete"),
    ("catalog", "optiongroup"): ("view", "add", "change", "delete"),
    ("catalog", "productoption"): ("view", "add", "change", "delete"),
    ("orders", "order"): ("view", "change"),
    ("orders", "orderitem"): ("view",),
    ("orders", "orderitemoption"): ("view",),
}


def create_restaurateur_group(apps, _schema_editor):
    content_type_model = apps.get_model("contenttypes", "ContentType")
    group_model = apps.get_model("auth", "Group")
    permission_model = apps.get_model("auth", "Permission")

    group, _ = group_model.objects.get_or_create(name=GROUP_NAME)
    permissions = []
    for (app_label, model_name), actions in ROLE_PERMISSIONS.items():
        content_type, _ = content_type_model.objects.get_or_create(
            app_label=app_label,
            model=model_name,
        )
        for action in actions:
            permission, _ = permission_model.objects.get_or_create(
                content_type=content_type,
                codename=f"{action}_{model_name}",
                defaults={"name": f"Can {action} {model_name}"},
            )
            permissions.append(permission)

    group.permissions.set(permissions)


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
        ("catalog", "0001_initial"),
        ("orders", "0002_alter_order_idempotency_key_and_more"),
        ("restaurants", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_restaurateur_group,
            reverse_code=migrations.RunPython.noop,
        )
    ]
