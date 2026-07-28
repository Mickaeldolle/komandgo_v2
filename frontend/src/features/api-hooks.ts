"use client";

import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { z } from "zod";

import { apiRequest } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import {
  cartSchema,
  orderSchema,
  ordersSchema,
  productSchema,
  restaurantDetailSchema,
  restaurantPageSchema,
  userSchema
} from "@/lib/schemas";

export function useRestaurants(search: string) {
  return useQuery({
    queryKey: queryKeys.restaurants(search),
    queryFn: () =>
      apiRequest(
        `/restaurants/?search=${encodeURIComponent(search)}`,
        restaurantPageSchema
      ),
    staleTime: 60_000
  });
}

export function useRestaurant(slug: string) {
  return useQuery({
    queryKey: queryKeys.restaurant(slug),
    queryFn: () => apiRequest(`/restaurants/${slug}/`, restaurantDetailSchema),
    enabled: Boolean(slug),
    staleTime: 60_000
  });
}

export function useProduct(restaurantSlug: string, productSlug: string) {
  return useQuery({
    queryKey: queryKeys.product(restaurantSlug, productSlug),
    queryFn: () =>
      apiRequest(
        `/restaurants/${restaurantSlug}/products/${productSlug}/`,
        productSchema
      ),
    enabled: Boolean(restaurantSlug && productSlug),
    staleTime: 60_000
  });
}

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: () => apiRequest("/cart/", cartSchema)
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      product_id: number;
      quantity: number;
      option_ids: number[];
      note: string;
    }) => apiRequest("/cart/", cartSchema, { method: "POST", body: payload }),
    onSuccess: (cart) => queryClient.setQueryData(queryKeys.cart, cart)
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      apiRequest(`/cart/items/${itemId}/`, cartSchema, {
        method: "PATCH",
        body: { quantity }
      }),
    onSuccess: (cart) => queryClient.setQueryData(queryKeys.cart, cart)
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) =>
      apiRequest(`/cart/items/${itemId}/`, cartSchema, { method: "DELETE" }),
    onSuccess: (cart) => queryClient.setQueryData(queryKeys.cart, cart)
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiRequest("/cart/", z.undefined(), { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart })
  });
}

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => apiRequest("/auth/me/", userSchema),
    retry: false
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      apiRequest("/auth/login/", userSchema, { method: "POST", body: payload }),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      void queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    }
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      phone: string;
    }) =>
      apiRequest("/auth/register/", userSchema, { method: "POST", body: payload }),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      void queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    }
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      first_name: string;
      last_name: string;
      phone: string;
    }) => apiRequest("/auth/me/", userSchema, { method: "PATCH", body: payload }),
    onSuccess: (user) => queryClient.setQueryData(queryKeys.me, user)
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiRequest("/auth/logout/", z.undefined(), { method: "POST" }),
    onSuccess: () => queryClient.clear()
  });
}

export function useOrders(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => apiRequest("/orders/", ordersSchema),
    enabled
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      fulfillment: "pickup" | "delivery" | "onsite";
      accepted_total: string;
      delivery_address: string;
      comment: string;
    }) =>
      apiRequest("/orders/", orderSchema, {
        method: "POST",
        body: payload,
        headers: { "Idempotency-Key": crypto.randomUUID() }
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      void queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    }
  });
}

