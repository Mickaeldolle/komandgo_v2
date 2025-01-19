'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
    type CustomerStore,
    createCustomerStore,
    initCustomerStore,
} from '@/stores/customer-store'

export type CustomerStoreApi = ReturnType<typeof createCustomerStore>

export const CustomerStoreContext = createContext<CustomerStoreApi | undefined>(
    undefined,
)

export interface CustomerStoreProviderProps {
    children: ReactNode
}

export const CustomerStoreProvider = ({
    children,
}: CustomerStoreProviderProps) => {
    const storeRef = useRef<CustomerStoreApi>(undefined)
    if (!storeRef.current) {
        storeRef.current = createCustomerStore(initCustomerStore())
    }

    return (
        <CustomerStoreContext.Provider value={storeRef.current}>
            {children}
        </CustomerStoreContext.Provider>
    )
}

export const useCustomerStore = <T,>(
    selector: (store: CustomerStore) => T,
): T => {
    const customerStoreContext = useContext(CustomerStoreContext)

    if (!customerStoreContext) {
        throw new Error(`CustomerStore must be used within CustomerStoreProvider`)
    }

    return useStore(customerStoreContext, selector)
}
