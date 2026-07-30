from decimal import Decimal

import factory
from django.contrib.auth import get_user_model

from apps.catalog.models import Category, OptionGroup, Product, ProductOption
from apps.orders.models import Order
from apps.restaurants.models import Restaurant

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"user{n}@example.test")
    username = factory.LazyAttribute(lambda obj: obj.email)
    first_name = "Alex"
    last_name = "Martin"
    phone = "0600000000"
    password = factory.django.Password("Valid-Test-Pass-2026!")


class RestaurantFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Restaurant

    owner = factory.SubFactory(UserFactory)
    slug = factory.Sequence(lambda n: f"restaurant-{n}")
    name = factory.Sequence(lambda n: f"Restaurant {n}")
    description = "Une cuisine préparée à la commande."
    address = "1 rue du Test"
    city = "Lille"
    postcode = "59000"
    is_active = True
    is_open = True
    delivery_enabled = True
    pickup_enabled = True
    minimum_order = Decimal("10.00")
    delivery_fee = Decimal("2.50")


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    restaurant = factory.SubFactory(RestaurantFactory)
    name = factory.Sequence(lambda n: f"Catégorie {n}")
    slug = factory.Sequence(lambda n: f"categorie-{n}")
    is_active = True


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    category = factory.SubFactory(CategoryFactory)
    name = factory.Sequence(lambda n: f"Produit {n}")
    slug = factory.Sequence(lambda n: f"produit-{n}")
    description = "Un produit de test."
    price = Decimal("12.00")
    is_active = True
    is_available = True


class OptionGroupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OptionGroup

    product = factory.SubFactory(ProductFactory)
    name = factory.Sequence(lambda n: f"Choix {n}")
    minimum = 1
    maximum = 1


class ProductOptionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductOption

    group = factory.SubFactory(OptionGroupFactory)
    name = factory.Sequence(lambda n: f"Option {n}")
    price_delta = Decimal("1.50")
    is_available = True


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory)
    restaurant = factory.SubFactory(RestaurantFactory)
    idempotency_key = factory.Sequence(lambda n: f"order-{n}")
    fulfillment = Order.Fulfillment.PICKUP
    subtotal = Decimal("12.00")
    delivery_fee = Decimal("0.00")
    total = Decimal("12.00")
    customer_name = "Alex Martin"
    customer_email = factory.LazyAttribute(lambda obj: obj.user.email)
    customer_phone = "0600000000"
