// src/stores/counter-store.ts
import { Shop } from '@/@types/shop'
import { createStore } from 'zustand/vanilla'

const shop: Shop = {
    id: 1,
    name: "Bistro Parisien",
    cuisine: "Française",
    address: {
        street: "10 Avenue des Champs",
        city: "Paris",
        postcode: "75008"
    },
    phone: "+33 1 44 11 22 33",
    website: "https://bistroparisien.fr",
    rating: 4.7,
    price_range: "$$$",
    features: ["Terrasse", "Réservations", "Wi-Fi gratuit"],
    hours: [
        { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
        { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
    ]
};


export type CustomerState = {
    selectedShop: Shop | null
    connected: boolean
}

export type CustomerActions = {
    selectShop: (shop: Shop) => void
    connect: (status: boolean) => void
}

export type CustomerStore = CustomerState & CustomerActions

export const initCustomerStore = (): CustomerState => {
    return {
        selectedShop: shop,
        connected: false
    }
}

export const defaultInitState: CustomerState = {
    selectedShop: null,
    connected: false
}

export const createCustomerStore = (
    initState: CustomerState = defaultInitState,
) => {
    return createStore<CustomerStore>()((set) => ({
        ...initState,
        selectShop: (shop: Shop) => set(() => ({ selectedShop: shop })),
        connect: (status: boolean) => set(() => ({ connected: status })),
    }))
}
