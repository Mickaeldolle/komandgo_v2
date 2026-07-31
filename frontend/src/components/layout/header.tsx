"use client";

import { ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";

import { useCart, useMe } from "@/features/api-hooks";

export function Header() {
  const cart = useCart();
  const me = useMe();
  const count =
    cart.data?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="KomandGo, accueil">
        <span className="brand__mark" aria-hidden="true">
          K
        </span>
        <span>KomandGo</span>
      </Link>
      <nav className="main-nav" aria-label="Navigation principale">
        <Link href="/restaurants">Restaurants</Link>
        {me.data?.is_restaurateur ? <Link href="/restaurateur">Espace pro</Link> : null}
        <Link className="nav-icon" href="/profile" aria-label="Mon profil">
          <UserRound aria-hidden="true" />
          <span className="nav-icon__label">
            {me.data ? me.data.first_name || "Profil" : "Connexion"}
          </span>
        </Link>
        <Link className="cart-link" href="/cart" aria-label={`Panier, ${count} article(s)`}>
          <ShoppingBag aria-hidden="true" />
          <span>Panier</span>
          {count > 0 ? <span className="cart-count">{count}</span> : null}
        </Link>
      </nav>
    </header>
  );
}



