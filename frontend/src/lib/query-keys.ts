export const queryKeys = {
  restaurants: (search = "") => ["restaurants", search] as const,
  restaurant: (slug: string) => ["restaurant", slug] as const,
  product: (restaurantSlug: string, productSlug: string) =>
    ["product", restaurantSlug, productSlug] as const,
  cart: ["cart"] as const,
  me: ["me"] as const,
  orders: ["orders"] as const
};

