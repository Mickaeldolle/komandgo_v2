from decimal import Decimal

import pytest
from rest_framework.test import APIClient

from apps.orders.models import Order

from .factories import (
    CategoryFactory,
    OptionGroupFactory,
    ProductFactory,
    ProductOptionFactory,
    RestaurantFactory,
    UserFactory,
)


def add_product(client: APIClient, product_id: int, option_ids: list[int] | None = None):
    return client.post(
        "/api/v1/cart/",
        {"product_id": product_id, "quantity": 1, "option_ids": option_ids or []},
        format="json",
    )


@pytest.mark.django_db
def test_cart_price_is_calculated_from_server_catalog():
    product = ProductFactory(price=Decimal("12.00"))
    group = OptionGroupFactory(product=product)
    option = ProductOptionFactory(group=group, price_delta=Decimal("1.50"))
    client = APIClient()

    response = add_product(client, product.id, [option.id])

    assert response.status_code == 201
    assert response.data["items"][0]["unit_price"] == "13.50"
    assert response.data["subtotal"] == "13.50"


@pytest.mark.django_db
def test_required_option_cannot_be_omitted():
    product = ProductFactory()
    OptionGroupFactory(product=product, minimum=1, maximum=1)

    response = add_product(APIClient(), product.id)

    assert response.status_code == 400
    assert "option_ids" in response.data["error"]["fields"]


@pytest.mark.django_db
def test_cart_rejects_products_from_another_restaurant():
    first = ProductFactory()
    second_restaurant = RestaurantFactory()
    second = ProductFactory(category=CategoryFactory(restaurant=second_restaurant))
    client = APIClient()
    assert add_product(client, first.id).status_code == 201

    response = add_product(client, second.id)

    assert response.status_code == 409
    assert response.data["error"]["code"] == "cart_restaurant_conflict"


@pytest.mark.django_db
def test_cart_is_merged_into_account_on_login():
    product = ProductFactory()
    user = UserFactory(email="merge@example.test")
    client = APIClient()
    assert add_product(client, product.id).status_code == 201

    response = client.post(
        "/api/v1/auth/login/",
        {"email": user.email, "password": "Valid-Test-Pass-2026!"},
        format="json",
    )

    assert response.status_code == 200
    cart = client.get("/api/v1/cart/")
    assert cart.data["items"][0]["product"] == product.id


@pytest.mark.django_db
def test_checkout_rejects_client_total_and_creates_immutable_snapshots():
    restaurant = RestaurantFactory(delivery_fee=Decimal("2.50"))
    product = ProductFactory(
        category=CategoryFactory(restaurant=restaurant),
        name="Original",
        price=Decimal("12.00"),
    )
    user = UserFactory()
    client = APIClient()
    client.force_authenticate(user)
    assert add_product(client, product.id).status_code == 201

    changed = client.post(
        "/api/v1/orders/",
        {
            "fulfillment": "pickup",
            "accepted_total": "1.00",
            "delivery_address": "",
            "comment": "",
        },
        format="json",
        HTTP_IDEMPOTENCY_KEY="checkout-test-1",
    )
    assert changed.status_code == 409
    assert Order.objects.count() == 0

    created = client.post(
        "/api/v1/orders/",
        {
            "fulfillment": "pickup",
            "accepted_total": "12.00",
            "delivery_address": "",
            "comment": "Sans oignons",
        },
        format="json",
        HTTP_IDEMPOTENCY_KEY="checkout-test-2",
    )
    assert created.status_code == 201
    order = Order.objects.get()
    product.name = "Nouveau nom"
    product.price = Decimal("99.00")
    product.save()
    assert order.items.get().product_name == "Original"
    assert order.items.get().unit_price == Decimal("12.00")

    repeated = client.post(
        "/api/v1/orders/",
        {
            "fulfillment": "pickup",
            "accepted_total": "12.00",
            "delivery_address": "",
            "comment": "Sans oignons",
        },
        format="json",
        HTTP_IDEMPOTENCY_KEY="checkout-test-2",
    )
    assert repeated.status_code == 200
    assert repeated.data["public_id"] == str(order.public_id)


@pytest.mark.django_db
def test_checkout_requires_an_idempotency_key():
    user = UserFactory()
    product = ProductFactory()
    client = APIClient()
    client.force_authenticate(user)
    assert add_product(client, product.id).status_code == 201

    response = client.post(
        "/api/v1/orders/",
        {"fulfillment": "pickup", "accepted_total": "12.00"},
        format="json",
    )

    assert response.status_code == 400
    assert "idempotency_key" in response.data["error"]["fields"]


@pytest.mark.django_db
def test_orders_are_isolated_per_user():
    first_user = UserFactory()
    second_user = UserFactory()
    product = ProductFactory()
    first_client = APIClient()
    first_client.force_authenticate(first_user)
    add_product(first_client, product.id)
    first_client.post(
        "/api/v1/orders/",
        {"fulfillment": "pickup", "accepted_total": "12.00"},
        format="json",
        HTTP_IDEMPOTENCY_KEY="isolation-test",
    )

    second_client = APIClient()
    second_client.force_authenticate(second_user)
    response = second_client.get("/api/v1/orders/")

    assert response.status_code == 200
    assert response.data == []
