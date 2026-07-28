"use client";

import { Bike, MapPin, ShoppingBag, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ErrorState, SkeletonList } from "@/components/ui/feedback";
import { useRestaurant } from "@/features/api-hooks";
import { money } from "@/lib/api-client";

import { ProductCard } from "./product-card";

export function RestaurantView({ slug }: { slug: string }) {
  const restaurant = useRestaurant(slug);
  if (restaurant.isPending) return <SkeletonList />;
  if (restaurant.isError) {
    return (
      <div className="page-shell">
        <ErrorState
          message="Ce restaurant est introuvable ou momentanément indisponible."
          onRetry={() => void restaurant.refetch()}
        />
      </div>
    );
  }

  const data = restaurant.data;
  return (
    <>
      <section className="restaurant-hero">
        <div className="restaurant-hero__photo">
          <Image
            src={data.banner_url || data.image_url || "/demo/catalog/category-36-burgers.png"}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="restaurant-hero__summary">
          <Link className="back-link" href="/restaurants">
            Tous les restaurants
          </Link>
          <div className="restaurant-hero__topline">
            <span className={`status ${data.is_open ? "status--open" : "status--closed"}`}>
              {data.is_open ? "Ouvert" : "Fermé"}
            </span>
            <span>{data.cuisine}</span>
          </div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <div className="service-grid">
            <span>
              <MapPin aria-hidden="true" />
              {data.address}, {data.city}
            </span>
            {data.pickup_enabled ? (
              <span>
                <ShoppingBag aria-hidden="true" />
                À emporter
              </span>
            ) : null}
            {data.delivery_enabled ? (
              <span>
                <Bike aria-hidden="true" />
                Livraison {money(data.delivery_fee)}
              </span>
            ) : null}
            {data.onsite_enabled ? (
              <span>
                <Utensils aria-hidden="true" />
                Sur place
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="catalog-shell">
        <nav className="category-nav" aria-label="Catégories du menu">
          {data.categories.map((category) => (
            <a key={category.id} href={`#${category.slug}`}>
              {category.name}
            </a>
          ))}
        </nav>
        <div className="catalog">
          {data.categories.map((category) => (
            <section className="catalog-section" id={category.slug} key={category.id}>
              <div className="catalog-section__heading">
                <div>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
                <span>{category.products.length} choix</span>
              </div>
              <div className="product-grid">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    restaurantSlug={data.slug}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

