import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})


export const metadata: Metadata = {
  title: 'KomandGO app new food ordering',
  description: 'Komandgo help you to order food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${roboto.variable} antialiased `}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
