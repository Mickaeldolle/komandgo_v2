import type { Metadata } from "next";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";


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
        <div className="min-h-dvh bg-background flex flex-col">
            <MobileNavBar />
            <div className="flex-1 p-2 flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
