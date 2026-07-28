"use client";

import { ChevronLeft, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ErrorState, LoadingState } from "@/components/ui/feedback";
import { useProduct } from "@/features/api-hooks";
import { money } from "@/lib/api-client";

import { ProductConfigurator } from "./product-configurator";

export function ProductView({
  restaurantSlug,
  productSlug
}: {
  restaurantSlug: string;
  productSlug: string;
}) {
  const product = useProduct(restaurantSlug, productSlug);
  if (product.isPending) return <LoadingState label="Préparation du produit…" />;
  if (product.isError) {
    return (
      <div className="page-shell">
        <ErrorState
          message="Ce produit est introuvable ou n’est plus proposé."
          onRetry={() => void product.refetch()}
        />
      </div>
    );
  }

  return (
    <section className="product-detail">
      <div className="product-detail__visual">
        <Link className="floating-back" href={`/restaurants/${restaurantSlug}`}>
          <ChevronLeft aria-hidden="true" />
          Retour au menu
        </Link>
        <Image
          src={product.data.image_url || "/demo/catalog/food-42-king-burger.png"}
          alt={product.data.name}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 48vw"
        />
        {!product.data.is_available ? (
          <span className="product-detail__unavailable">Actuellement indisponible</span>
        ) : null}
      </div>
      <div className="product-detail__content">
        <p className="kicker">À composer</p>
        <div className="product-detail__heading">
          <h1>{product.data.name}</h1>
          <strong>À partir de {money(product.data.price)}</strong>
        </div>
        <p className="product-detail__description">{product.data.description}</p>
        {product.data.allergens ? (
          <p className="allergen-note">
            <Info aria-hidden="true" />
            Allergènes déclarés : {product.data.allergens}
          </p>
        ) : null}
        <ProductConfigurator product={product.data} />
      </div>
    </section>
  );
}

