import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import "./home.css";
import "./auth/auth.css";
import "./cart/cart.css";
import "./profile/profile.css";
import "./restaurants/restaurants.css";
import "./restaurants/restaurant.css";
import "./restaurants/product.css";
import "./restaurateur/restaurateur.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "KomandGo — commandez en direct",
    template: "%s · KomandGo"
  },
  description:
    "Découvrez des restaurants indépendants, composez votre commande et gardez le contact direct."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123b2a"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <a className="skip-link" href="#main">
            Aller au contenu
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

