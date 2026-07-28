import type { Metadata } from "next";

import { RestaurantsBrowser } from "@/components/catalog/restaurants-browser";

export const metadata: Metadata = {
  title: "Restaurants"
};

export default function RestaurantsPage() {
  return <RestaurantsBrowser />;
}

