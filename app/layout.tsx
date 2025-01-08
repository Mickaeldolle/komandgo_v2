import type { Metadata } from "next";
import { Roboto, Inter, Pacifico, Black_Ops_One } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: [
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
      '#e35340',
    ],
  },
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const backOpsOne = Black_Ops_One({
  variable: "--font-black-ops-one",
  subsets: ["latin"],
  weight: "400",
});

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
    <html lang="fr" {...mantineHtmlProps} suppressHydrationWarning={true}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${roboto.variable} ${inter.variable} ${pacifico.variable} ${backOpsOne.variable} antialiased `}
      >
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
