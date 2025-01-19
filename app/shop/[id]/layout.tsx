import type { Metadata } from "next";


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
        <div className="bg-background flex flex-col min-h-dvh">
            <main className="flex-1">
                {children}
            </main>
        </div>

    );
}
