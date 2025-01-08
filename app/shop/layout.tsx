import type { Metadata } from "next";
import PreviousIcon from "../components/ui/PreviousIcon";


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
        <div className="p-2 bg-gray-100 flex flex-col h-dvh">
            <PreviousIcon />
            <main className="flex-1">
                {children}
            </main>
        </div>

    );
}
