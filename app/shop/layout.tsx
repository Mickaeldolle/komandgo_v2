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
        <div className="p-3 bg-gray-100 h-screen flex flex-col">
            <PreviousIcon />
            <main>
                {children}
            </main>
        </div>

    );
}
