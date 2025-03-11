import type { Metadata } from "next";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";


export const metadata: Metadata = {
    title: 'KomandGO app new food ordering',
    description: 'Page de profil',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-background p-2 flex flex-col h-dvh">
            <MobileNavBar />
            <main className="flex-1">
                {children}
            </main>
        </div>

    );
}