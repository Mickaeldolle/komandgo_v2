import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Restaurant } from "@/lib/schemas";

import { RestaurantCard } from "./restaurant-card";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ""} />
  )
}));

const restaurant: Restaurant = {
  id: "b9a53bf5-176e-4d21-b204-f70dcd3e9633",
  slug: "atelier",
  name: "L’Atelier",
  description: "Cuisine test",
  cuisine: "Burgers",
  city: "Lille",
  postcode: "59000",
  image_url: "/demo.png",
  is_open: true,
  delivery_enabled: true,
  pickup_enabled: true,
  onsite_enabled: false,
  minimum_order: "15.00",
  delivery_fee: "2.50"
};

describe("RestaurantCard", () => {
  it("exposes status, location and accessible destination", () => {
    render(<RestaurantCard restaurant={restaurant} />);
    expect(screen.getByText("Ouvert")).toBeInTheDocument();
    expect(screen.getByText(/Lille/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voir L’Atelier" })).toHaveAttribute(
      "href",
      "/restaurants/atelier"
    );
  });
});

