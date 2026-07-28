import { describe, expect, it } from "vitest";

import { cartSchema, productSchema } from "./schemas";

describe("runtime API schemas", () => {
  it("rejects a product with a numeric price", () => {
    const result = productSchema.safeParse({
      id: 1,
      slug: "burger",
      name: "Burger",
      description: "",
      price: 12.5,
      image_url: "",
      allergens: "",
      is_available: true,
      delivery_enabled: true,
      pickup_enabled: true,
      onsite_enabled: false,
      category_slug: "burgers",
      restaurant_slug: "demo",
      option_groups: []
    });

    expect(result.success).toBe(false);
  });

  it("accepts the explicit empty cart contract", () => {
    const result = cartSchema.parse({
      id: null,
      restaurant: null,
      status: "active",
      items: [],
      subtotal: "0.00",
      updated_at: null
    });

    expect(result.items).toEqual([]);
    expect(result.subtotal).toBe("0.00");
  });
});

