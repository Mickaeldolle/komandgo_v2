import pytest
from rest_framework.test import APIClient

from .factories import CategoryFactory, ProductFactory, RestaurantFactory


@pytest.mark.django_db
def test_restaurant_list_hides_inactive_restaurants():
    RestaurantFactory(name="Visible")
    RestaurantFactory(name="Masqué", is_active=False)

    response = APIClient().get("/api/v1/restaurants/")

    assert response.status_code == 200
    names = [restaurant["name"] for restaurant in response.data["results"]]
    assert names == ["Visible"]


@pytest.mark.django_db
def test_restaurant_detail_returns_only_active_catalog_entries():
    restaurant = RestaurantFactory()
    active_category = CategoryFactory(restaurant=restaurant, name="Burgers")
    hidden_category = CategoryFactory(restaurant=restaurant, is_active=False)
    ProductFactory(category=active_category, name="Signature")
    ProductFactory(category=active_category, name="Ancien", is_active=False)
    ProductFactory(category=hidden_category, name="Caché")

    response = APIClient().get(f"/api/v1/restaurants/{restaurant.slug}/")

    assert response.status_code == 200
    assert [category["name"] for category in response.data["categories"]] == ["Burgers"]
    assert [product["name"] for product in response.data["categories"][0]["products"]] == [
        "Signature"
    ]


@pytest.mark.django_db
def test_openapi_schema_and_documentation_are_available():
    client = APIClient()

    schema_response = client.get("/api/v1/schema/")
    documentation_response = client.get("/api/v1/docs/")

    assert schema_response.status_code == documentation_response.status_code == 200
