import type { Metadata } from "next";

import { ProductView } from "@/components/catalog/product-view";

export const metadata: Metadata = {
  title: "Configurer le produit"
};

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = await params;
  return <ProductView restaurantSlug={slug} productSlug={productSlug} />;
}

