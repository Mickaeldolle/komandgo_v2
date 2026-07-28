import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>KomandGo</strong>
        <p>Commander directement auprès de restaurants indépendants.</p>
      </div>
      <nav aria-label="Liens de pied de page">
        <Link href="/restaurants">Restaurants</Link>
        <Link href="/profile">Mon compte</Link>
        <a href="http://localhost:8000/api/v1/docs/">Documentation API</a>
      </nav>
    </footer>
  );
}

