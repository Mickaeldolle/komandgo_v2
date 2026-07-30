import pytest
from django.contrib import admin
from django.contrib.auth.models import Group
from django.test import RequestFactory
from django.urls import reverse

from apps.catalog.models import Category, OptionGroup, Product
from apps.orders.models import Order
from apps.restaurants.models import Restaurant

from .factories import (
    CategoryFactory,
    OptionGroupFactory,
    OrderFactory,
    ProductFactory,
    RestaurantFactory,
    UserFactory,
)

pytestmark = pytest.mark.django_db

EXPECTED_PERMISSIONS = {
    ("restaurants", "view_restaurant"),
    ("restaurants", "change_restaurant"),
    *{
        ("catalog", f"{action}_{model}")
        for model in ("category", "product", "optiongroup", "productoption")
        for action in ("view", "add", "change", "delete")
    },
    ("orders", "view_order"),
    ("orders", "change_order"),
    ("orders", "view_orderitem"),
    ("orders", "view_orderitemoption"),
}


def restaurateur_user():
    user = UserFactory(is_staff=True)
    user.groups.add(Group.objects.get(name="Restaurateurs"))
    return user


def admin_request(user):
    request = RequestFactory().get("/admin/")
    request.user = user
    return request


def test_restaurateur_group_has_only_expected_permissions():
    group = Group.objects.get(name="Restaurateurs")

    permissions = set(group.permissions.values_list("content_type__app_label", "codename"))

    assert permissions == EXPECTED_PERMISSIONS


def test_is_staff_without_group_cannot_open_restaurant_admin(client):
    client.force_login(UserFactory(is_staff=True))

    response = client.get(reverse("admin:restaurants_restaurant_changelist"))

    assert response.status_code == 403


def test_restaurant_scoped_admin_querysets_only_return_owned_objects():
    owner = restaurateur_user()
    other_owner = UserFactory(is_staff=True)
    owned_restaurant = RestaurantFactory(owner=owner)
    second_owned_restaurant = RestaurantFactory(owner=owner)
    foreign_restaurant = RestaurantFactory(owner=other_owner)

    owned_category = CategoryFactory(restaurant=owned_restaurant)
    foreign_category = CategoryFactory(restaurant=foreign_restaurant)
    owned_product = ProductFactory(category=owned_category)
    foreign_product = ProductFactory(category=foreign_category)
    owned_group = OptionGroupFactory(product=owned_product)
    foreign_group = OptionGroupFactory(product=foreign_product)
    owned_order = OrderFactory(restaurant=second_owned_restaurant)
    foreign_order = OrderFactory(restaurant=foreign_restaurant)

    request = admin_request(owner)
    expected_objects = (
        (Restaurant, owned_restaurant, foreign_restaurant),
        (Category, owned_category, foreign_category),
        (Product, owned_product, foreign_product),
        (OptionGroup, owned_group, foreign_group),
        (Order, owned_order, foreign_order),
    )

    for model, owned, foreign in expected_objects:
        queryset = admin.site._registry[model].get_queryset(request)
        assert queryset.filter(pk=owned.pk).exists()
        assert not queryset.filter(pk=foreign.pk).exists()


def test_order_admin_filters_and_sorts_owned_restaurants(client):
    owner = restaurateur_user()
    restaurant_b = RestaurantFactory(owner=owner, name="Brasserie B")
    restaurant_a = RestaurantFactory(owner=owner, name="Atelier A")
    foreign = RestaurantFactory(name="Restaurant confidentiel")
    OrderFactory(restaurant=restaurant_b)
    OrderFactory(restaurant=restaurant_a)
    OrderFactory(restaurant=foreign, customer_email="private@example.test")
    client.force_login(owner)

    response = client.get(reverse("admin:orders_order_changelist"))

    assert response.status_code == 200
    content = response.content.decode()
    assert restaurant_a.name in content
    assert restaurant_b.name in content
    assert foreign.name not in content
    assert "private@example.test" not in content
    result_restaurants = [order.restaurant.name for order in response.context["cl"].result_list]
    assert result_restaurants == [restaurant_a.name, restaurant_b.name]


def test_direct_foreign_order_access_is_hidden(client):
    owner = restaurateur_user()
    own_order = OrderFactory(restaurant=RestaurantFactory(owner=owner))
    foreign_order = OrderFactory()
    model_admin = admin.site._registry[Order]
    request = admin_request(owner)
    client.force_login(owner)

    assert model_admin.has_change_permission(request, own_order)
    assert not model_admin.has_change_permission(request, foreign_order)
    response = client.get(reverse("admin:orders_order_change", args=[foreign_order.pk]))
    assert response.status_code == 302


def test_catalog_foreign_key_choices_are_limited_to_owned_restaurants():
    owner = restaurateur_user()
    owned_restaurant = RestaurantFactory(owner=owner)
    foreign_restaurant = RestaurantFactory()
    owned_category = CategoryFactory(restaurant=owned_restaurant)
    foreign_category = CategoryFactory(restaurant=foreign_restaurant)
    owned_product = ProductFactory(category=owned_category)
    foreign_product = ProductFactory(category=foreign_category)
    request = admin_request(owner)

    cases = (
        (Category, "restaurant", {owned_restaurant.pk}),
        (Product, "category", {owned_category.pk}),
        (OptionGroup, "product", {owned_product.pk}),
    )
    for model, field_name, expected_ids in cases:
        model_admin = admin.site._registry[model]
        model_field = model._meta.get_field(field_name)
        form_field = model_admin.formfield_for_foreignkey(model_field, request)
        assert set(form_field.queryset.values_list("pk", flat=True)) == expected_ids

    assert foreign_restaurant.pk != owned_restaurant.pk
    assert foreign_category.pk != owned_category.pk
    assert foreign_product.pk != owned_product.pk


def test_foreign_restaurant_cannot_be_forged_when_adding_category(client):
    owner = restaurateur_user()
    RestaurantFactory(owner=owner)
    foreign_restaurant = RestaurantFactory()
    client.force_login(owner)

    response = client.post(
        reverse("admin:catalog_category_add"),
        {
            "restaurant": str(foreign_restaurant.pk),
            "name": "Catégorie interdite",
            "slug": "categorie-interdite",
            "description": "",
            "image_url": "",
            "position": 0,
            "is_active": "on",
            "_save": "Enregistrer",
        },
    )

    assert response.status_code == 200
    assert not Category.objects.filter(slug="categorie-interdite").exists()


def test_superuser_keeps_global_access_and_owner_is_readonly_for_staff():
    owner = restaurateur_user()
    owned_restaurant = RestaurantFactory(owner=owner)
    foreign_restaurant = RestaurantFactory()
    restaurant_admin = admin.site._registry[Restaurant]

    staff_request = admin_request(owner)
    assert "owner" in restaurant_admin.get_readonly_fields(staff_request, owned_restaurant)

    superuser = UserFactory(is_staff=True, is_superuser=True)
    superuser_request = admin_request(superuser)
    visible_ids = set(restaurant_admin.get_queryset(superuser_request).values_list("pk", flat=True))
    assert {owned_restaurant.pk, foreign_restaurant.pk} <= visible_ids
