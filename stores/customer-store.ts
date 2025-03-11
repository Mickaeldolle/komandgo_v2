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
        selectedShop: null,
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
