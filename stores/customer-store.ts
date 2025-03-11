// src/stores/counter-store.ts
import { Shop } from '@/@types/shop'
import { createStore } from 'zustand/vanilla'

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
        selectedShop: {
            id: 1,
            name: "Bistro Parisien",
            slug: "1-bistro-parisien",
            type: "restaurant",
            imageUrl: "/img-1.jpg",
            open: true,
            cuisine: ["Française"],
            address: {
                street: "10 Avenue des Champs",
                city: "Paris",
                postcode: "75008",
                label: "10 Avenue des Champs, 75008 Paris"
            },
            phone: "+33 1 44 11 22 33",
            website: "https://bistroparisien.fr",
            rating: 4.7,
            price_range: "$$$",
            features: ["Terrasse", "Réservations", "Wi-Fi gratuit"],
            hours: [
                {
                    id: 2,
                    day: 2,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 3,
                    day: 3,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 4,
                    day: 4,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 5,
                    day: 5,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 6,
                    day: 6,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 7,
                    day: 7,
                    open: "10:00",
                    close: "22:00",
                    shopUuid: "1",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                },
                {
                    id: 8,
                    day: 1,
                    shopUuid: "1",
                    open: "10:00",
                    close: "22:00",
                    clickAndCollect: true,
                    delivery: true,
                    onSite: true
                }
            ]
        },
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
