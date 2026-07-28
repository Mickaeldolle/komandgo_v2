import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { money } from "@/lib/api-client";
import type { Product } from "@/lib/schemas";

export function ProductCard({
  product,
  restaurantSlug
}: {
  product: Product;
  restaurantSlug: string;
}) {
  return (
    <article className={`product-card ${product.is_available ? "" : "product-card--disabled"}`}>
      <div className="product-card__content">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-card__bottom">
          <strong>{money(product.price)}</strong>
          {product.is_available ? (
            <Link
              className="round-link"
              href={`/restaurants/${restaurantSlug}/products/${product.slug}`}
              aria-label={`Configurer ${product.name}`}
            >
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            <span className="unavailable">Indisponible</span>
          )}
        </div>
      </div>
      <div className="product-card__image">
        <Image
          src={product.image_url || "/demo/catalog/food-42-king-burger.png"}
          alt=""
          fill
          sizes="(max-width: 700px) 36vw, 220px"
        />
      </div>
    </article>
  );
}

