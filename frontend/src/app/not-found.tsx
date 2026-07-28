import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Cette table n’existe pas.</h1>
      <p>La page a peut-être changé d’adresse ou le produit n’est plus proposé.</p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          Retour à l’accueil
        </Link>
      </Button>
    </section>
  );
}

