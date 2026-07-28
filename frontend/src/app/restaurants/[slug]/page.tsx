import type { Metadata } from "next";

import { RestaurantView } from "@/components/catalog/restaurant-view";

export const metadata: Metadata = {
  title: "Menu du restaurant"
};

export default async function RestaurantPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RestaurantView slug={slug} />;
}

