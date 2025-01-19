import type { Metadata } from "next";
import PreviousIcon from "../components/ui/PreviousIcon";
import { Suspense } from "react";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
// import { CustomerStoreProvider } from '@/providers/customer-store-provider'


export const metadata: Metadata = {
    title: 'KomandGO app new food ordering',
    description: 'Page de recherche de lieu',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-dvh">
            <MobileNavBar />
            <div className="bg-background p-2 flex flex-col ">
                {/* <CustomerStoreProvider > */}
                <main className="flex-1">
                    {children}
                </main>
                {/* </CustomerStoreProvider> */}
            </div>
        </div>

    );
}
