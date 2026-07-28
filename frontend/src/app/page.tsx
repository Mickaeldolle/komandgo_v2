/*
THESIS: KomandGo est une table déjà dressée, pas un comparateur de livraison.
OWN-WORLD: papier chaud, vert comptoir, ambre et photos de plats en assiettes franches.
STORY: comprendre l’achat direct, découvrir une adresse, ouvrir son menu.
FIRST VIEWPORT: promesse et action à gauche, composition de trois plats à droite.
FORM: septième structure — table asymétrique, seed 20f24c1f.
*/
import { ArrowRight, Check, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="kicker">La commande qui reste à la bonne table</p>
          <h1>Votre prochain plat commence tout près.</h1>
          <p className="home-hero__lead">
            Découvrez les restaurants indépendants, composez sans surprise et
            commandez directement chez eux.
          </p>
          <div className="home-hero__actions">
            <Button asChild>
              <Link href="/restaurants">
                Trouver un restaurant <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <span className="location-note">
              <MapPin aria-hidden="true" />
              Recherche par ville ou code postal
            </span>
          </div>
          <ul className="trust-list" aria-label="Engagements KomandGo">
            <li>
              <Check aria-hidden="true" />
              Prix validés par le restaurant
            </li>
            <li>
              <Check aria-hidden="true" />
              Indisponibilités visibles
            </li>
            <li>
              <Check aria-hidden="true" />
              Panier clair, sans détour
            </li>
          </ul>
        </div>
        <div className="table-scene" aria-label="Sélection de plats du menu de démonstration">
          <Link
            className="plate plate--main"
            href="/restaurants/atelier-du-burger/products/le-signature"
            aria-label="Configurer Le Signature"
          >
            <Image
              src="/demo/catalog/food-42-king-burger.png"
              alt="Burger signature"
              fill
              priority
              sizes="(max-width: 800px) 70vw, 34vw"
            />
            <span>Le Signature</span>
          </Link>
          <Link
            className="plate plate--side"
            href="/restaurants/atelier-du-burger/products/frites-maison"
            aria-label="Configurer les frites maison"
          >
            <Image
              src="/demo/catalog/food-31-petite-frites.png"
              alt="Frites maison"
              fill
              sizes="(max-width: 800px) 46vw, 24vw"
            />
            <span>Frites maison</span>
          </Link>
          <Link
            className="plate plate--fresh"
            href="/restaurants/atelier-du-burger"
            aria-label="Voir le menu de L’Atelier du Burger"
          >
            <Image
              src="/demo/catalog/food-71-salade-poulet.png"
              alt="Salade au poulet"
              fill
              sizes="(max-width: 800px) 52vw, 20vw"
            />
          </Link>
          <span className="table-note">Exemple du catalogue de démonstration</span>
        </div>
      </section>

      <section className="how-it-works">
        <div>
          <p className="kicker">Un parcours, trois décisions</p>
          <h2>Choisissez. Composez. Savourez.</h2>
        </div>
        <ol>
          <li>
            <strong>Une adresse</strong>
            <span>Consultez les services et les horaires avant de choisir.</span>
          </li>
          <li>
            <strong>Votre recette</strong>
            <span>Options, suppléments et disponibilité sont explicites.</span>
          </li>
          <li>
            <strong>Le bon total</strong>
            <span>Le serveur recalcule chaque prix avant la commande.</span>
          </li>
        </ol>
      </section>
    </>
  );
}

