import os
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from apps.catalog.models import Category, OptionGroup, Product, ProductOption
from apps.restaurants.models import Restaurant

User = get_user_model()


class Command(BaseCommand):
    help = "Crée des données de démonstration idempotentes et un administrateur local."

    @transaction.atomic
    def handle(self, *args, **options):
        admin_email = os.getenv("DEMO_ADMIN_EMAIL", "admin@komandgo.local")
        admin_password = os.getenv("DEMO_ADMIN_PASSWORD", "")
        if len(admin_password) < 14:
            raise CommandError(
                "DEMO_ADMIN_PASSWORD doit contenir au moins 14 caractères. "
                "Copiez .env.example pour le développement local."
            )

        admin, _ = User.objects.update_or_create(
            email=admin_email.lower(),
            defaults={
                "username": admin_email.lower(),
                "first_name": "Admin",
                "last_name": "KomandGo",
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
            },
        )
        admin.set_password(admin_password)
        admin.save(update_fields=("password",))

        customer, created = User.objects.get_or_create(
            email="demo@komandgo.local",
            defaults={
                "username": "demo@komandgo.local",
                "first_name": "Camille",
                "last_name": "Martin",
                "phone": "0612345678",
            },
        )
        if created:
            customer.set_password("Demo-Customer-2026!")
            customer.save(update_fields=("password",))

        restaurant, _ = Restaurant.objects.update_or_create(
            slug="atelier-du-burger",
            defaults={
                "owner": admin,
                "name": "L’Atelier du Burger",
                "description": (
                    "Burgers généreux, pains toastés et recettes préparées à la commande."
                ),
                "cuisine": "Burgers artisanaux",
                "address": "12 rue des Gourmets",
                "city": "Lille",
                "postcode": "59000",
                "phone": "0320123456",
                "banner_url": "/demo/catalog/category-36-burgers.png",
                "image_url": "/demo/catalog/food-42-king-burger.png",
                "is_active": True,
                "is_open": True,
                "delivery_enabled": True,
                "pickup_enabled": True,
                "minimum_order": Decimal("15.00"),
                "delivery_fee": Decimal("2.50"),
            },
        )
        burgers, _ = Category.objects.update_or_create(
            restaurant=restaurant,
            slug="burgers",
            defaults={
                "name": "Burgers",
                "description": "Nos signatures, servies seules ou accompagnées.",
                "image_url": "/demo/catalog/category-36-burgers.png",
                "position": 1,
            },
        )
        sides, _ = Category.objects.update_or_create(
            restaurant=restaurant,
            slug="accompagnements",
            defaults={
                "name": "Accompagnements",
                "description": "Pour compléter votre commande.",
                "image_url": "/demo/catalog/category-38-frites.png",
                "position": 2,
            },
        )
        drinks, _ = Category.objects.update_or_create(
            restaurant=restaurant,
            slug="boissons",
            defaults={
                "name": "Boissons",
                "description": "Fraîches et sans détour.",
                "image_url": "/demo/catalog/category-37-boissons.png",
                "position": 3,
            },
        )

        products = [
            (
                burgers,
                "le-signature",
                "Le Signature",
                "Steak français, cheddar affiné, oignons confits et sauce maison.",
                "13.90",
                "/demo/catalog/food-42-king-burger.png",
                True,
                1,
            ),
            (
                burgers,
                "chevre-miel",
                "Chèvre & Miel",
                "Steak, chèvre, miel, roquette et noix.",
                "14.50",
                "/demo/catalog/food-38-burger-chevre-miel.png",
                True,
                2,
            ),
            (
                burgers,
                "veggie-croquant",
                "Veggie Croquant",
                "Galette végétale, pickles, salade et sauce citronnée.",
                "12.90",
                "/demo/catalog/food-34-burger-veggie.png",
                False,
                3,
            ),
            (
                sides,
                "frites-maison",
                "Frites maison",
                "Pommes de terre fraîches, double cuisson.",
                "4.50",
                "/demo/catalog/food-31-petite-frites.png",
                True,
                1,
            ),
            (
                drinks,
                "cola-artisanal",
                "Cola artisanal",
                "33 cl, servi frais.",
                "3.20",
                "/demo/catalog/food-32-cola.png",
                True,
                1,
            ),
        ]
        created_products: dict[str, Product] = {}
        for category, slug, name, description, price, image, available, position in products:
            product, _ = Product.objects.update_or_create(
                category=category,
                slug=slug,
                defaults={
                    "name": name,
                    "description": description,
                    "price": Decimal(price),
                    "image_url": image,
                    "allergens": "Gluten, lait" if category == burgers else "",
                    "is_active": True,
                    "is_available": available,
                    "position": position,
                },
            )
            created_products[slug] = product

        cooking, _ = OptionGroup.objects.update_or_create(
            product=created_products["le-signature"],
            name="Cuisson du steak",
            defaults={
                "description": "Choisissez une cuisson.",
                "minimum": 1,
                "maximum": 1,
                "position": 1,
            },
        )
        for position, name in enumerate(("Saignant", "À point", "Bien cuit"), start=1):
            ProductOption.objects.update_or_create(
                group=cooking,
                name=name,
                defaults={"position": position, "price_delta": Decimal("0.00")},
            )

        extras, _ = OptionGroup.objects.update_or_create(
            product=created_products["le-signature"],
            name="Suppléments",
            defaults={"minimum": 0, "maximum": 2, "position": 2},
        )
        for position, (name, price) in enumerate(
            (("Cheddar affiné", "1.20"), ("Bacon grillé", "1.80"), ("Jalapeños", "0.80")),
            start=1,
        ):
            ProductOption.objects.update_or_create(
                group=extras,
                name=name,
                defaults={"position": position, "price_delta": Decimal(price)},
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Données créées. Admin: "
                f"{admin_email} · Client: demo@komandgo.local / Demo-Customer-2026!"
            )
        )
