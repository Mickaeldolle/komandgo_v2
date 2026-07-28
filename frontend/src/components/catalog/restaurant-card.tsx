import { MapPin, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { money } from "@/lib/api-client";
import type { Restaurant } from "@/lib/schemas";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="restaurant-card">
      <Link href={`/restaurants/${restaurant.slug}`} aria-label={`Voir ${restaurant.name}`}>
        <div className="restaurant-card__image">
          <Image
            src={restaurant.image_url || "/demo/catalog/food-42-king-burger.png"}
            alt=""
            fill
            sizes="(max-width: 700px) 34vw, 240px"
          />
        </div>
      </Link>
      <div className="restaurant-card__content">
        <div className="restaurant-card__topline">
          <span className={`status ${restaurant.is_open ? "status--open" : "status--closed"}`}>
            {restaurant.is_open ? "Ouvert" : "Fermé"}
          </span>
          <span>{restaurant.cuisine}</span>
        </div>
        <h2>
          <Link href={`/restaurants/${restaurant.slug}`}>{restaurant.name}</Link>
        </h2>
        <p>{restaurant.description}</p>
        <div className="restaurant-card__meta">
          <span>
            <MapPin aria-hidden="true" />
            {restaurant.city} · {restaurant.postcode}
          </span>
          {restaurant.delivery_enabled ? (
            <span>
              <ShoppingBag aria-hidden="true" />
              Livraison dès {money(restaurant.minimum_order)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

