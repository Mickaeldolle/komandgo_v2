"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { ErrorState, SkeletonList } from "@/components/ui/feedback";
import { useRestaurants } from "@/features/api-hooks";

import { RestaurantCard } from "./restaurant-card";

export function RestaurantsBrowser() {
  const [search, setSearch] = useState("");
  const restaurants = useRestaurants(search);

  return (
    <section className="page-shell">
      <div className="page-heading">
        <div>
          <p className="kicker">À votre table, sans détour</p>
          <h1>Les restaurants</h1>
          <p>Trouvez une cuisine, vérifiez les services disponibles et composez.</p>
        </div>
        <label className="search-field">
          <span className="sr-only">Rechercher un restaurant</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Nom, ville ou cuisine…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>

      {restaurants.isPending ? <SkeletonList /> : null}
      {restaurants.isError ? (
        <ErrorState
          message="La liste des restaurants ne répond pas."
          onRetry={() => void restaurants.refetch()}
        />
      ) : null}
      {restaurants.data?.results.length === 0 ? (
        <div className="empty-state">
          <h2>Aucun restaurant trouvé</h2>
          <p>Essayez un autre nom, une ville ou un code postal.</p>
        </div>
      ) : null}
      <div className="restaurant-list">
        {restaurants.data?.results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}

