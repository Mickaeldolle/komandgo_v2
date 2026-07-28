"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Fulfillment = "pickup" | "delivery" | "onsite";

type PreferencesState = {
  fulfillment: Fulfillment;
  setFulfillment: (fulfillment: Fulfillment) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      fulfillment: "pickup",
      setFulfillment: (fulfillment) => set({ fulfillment })
    }),
    { name: "komandgo-preferences" }
  )
);

