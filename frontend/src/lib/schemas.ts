import { z } from "zod";

export const optionSchema = z.object({
  id: z.number(),
  name: z.string(),
  price_delta: z.string(),
  is_available: z.boolean()
});

export const optionGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  minimum: z.number(),
  maximum: z.number(),
  options: z.array(optionSchema)
});

export const productSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image_url: z.string(),
  allergens: z.string(),
  is_available: z.boolean(),
  delivery_enabled: z.boolean(),
  pickup_enabled: z.boolean(),
  onsite_enabled: z.boolean(),
  category_slug: z.string(),
  restaurant_slug: z.string(),
  option_groups: z.array(optionGroupSchema)
});

export const categorySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  products: z.array(productSchema)
});

export const restaurantSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  cuisine: z.string(),
  city: z.string(),
  postcode: z.string(),
  image_url: z.string(),
  is_open: z.boolean(),
  delivery_enabled: z.boolean(),
  pickup_enabled: z.boolean(),
  onsite_enabled: z.boolean(),
  minimum_order: z.string(),
  delivery_fee: z.string()
});

export const restaurantDetailSchema = restaurantSchema.extend({
  address: z.string(),
  phone: z.string(),
  banner_url: z.string(),
  categories: z.array(categorySchema)
});

export const restaurantPageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(restaurantSchema)
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  is_restaurateur: z.boolean().default(false)
});

export const cartItemOptionSchema = z.object({
  id: z.number(),
  group_name: z.string(),
  option_name: z.string(),
  price_delta: z.string()
});

export const cartItemSchema = z.object({
  id: z.number(),
  product: z.number(),
  product_slug: z.string(),
  product_name: z.string(),
  image_url: z.string(),
  is_available: z.boolean(),
  quantity: z.number(),
  unit_price: z.string(),
  line_total: z.string(),
  note: z.string(),
  selections: z.array(cartItemOptionSchema)
});

export const cartSchema = z.object({
  id: z.number().nullable(),
  restaurant: z
    .object({
      id: z.string(),
      slug: z.string(),
      name: z.string()
    })
    .nullable(),
  status: z.string(),
  items: z.array(cartItemSchema),
  subtotal: z.string(),
  updated_at: z.string().nullable()
});

export const orderSchema = z.object({
  public_id: z.string(),
  restaurant: z.string(),
  restaurant_slug: z.string(),
  status: z.string(),
  fulfillment: z.string(),
  subtotal: z.string(),
  delivery_fee: z.string(),
  total: z.string(),
  delivery_address: z.string(),
  comment: z.string(),
  items: z.array(
    z.object({
      product_name: z.string(),
      quantity: z.number(),
      unit_price: z.string(),
      line_total: z.string(),
      note: z.string(),
      selections: z.array(
        z.object({
          group_name: z.string(),
          option_name: z.string(),
          price_delta: z.string()
        })
      )
    })
  ),
  created_at: z.string(),
  updated_at: z.string()
});

export const ordersSchema = z.array(orderSchema);

export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantDetail = z.infer<typeof restaurantDetailSchema>;
export type Product = z.infer<typeof productSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type User = z.infer<typeof userSchema>;
export type Order = z.infer<typeof orderSchema>;

