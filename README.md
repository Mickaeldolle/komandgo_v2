# KomandGo

KomandGo est une reconstruction complète du prototype historique de commande
multi-restaurant. Le dépôt contient un monolithe modulaire Django/DRF, un frontend
Next.js App Router et un environnement PostgreSQL reproductible.

## Fonctionnalités livrées

- catalogue public paginé, filtrable et recherchable ;
- détail d’un restaurant, catégories, produits, allergènes, options et suppléments ;
- panier anonyme côté serveur, mono-restaurant, fusion à la connexion ;
- recalcul des prix et validation des options exclusivement côté serveur ;
- inscription, session sécurisée, connexion, profil et déconnexion ;
- checkout idempotent, contrôle du total accepté et snapshots de commande ;
- administration Django du catalogue, des disponibilités, paniers, commandes et comptes ;
- API OpenAPI, erreurs normalisées, logs JSON et health check ;
- interface responsive, accessible, avec chargements, erreurs et états vides.

## Architecture

```text
backend/                 Django 5.2 LTS, DRF, services métier, migrations
frontend/                Next.js 16, TypeScript strict, TanStack Query, Zustand
docker/                  reverse proxy Nginx
docs/                    analyses, ADR, sécurité, API, déploiement, validation
docker-compose.yml       PostgreSQL + backend + frontend + passerelle
```

Le navigateur parle à une origine unique (`http://localhost:8080`) en Docker.
Nginx distribue `/api` et `/admin` vers Django et le reste vers Next.js. Cette
topologie simplifie les cookies de session et la protection CSRF.

## Prérequis

- voie recommandée : Docker Desktop avec Compose ;
- voie locale : Python 3.11+, Node.js 24+, npm 11+ ;
- PostgreSQL 17 pour reproduire la cible, ou SQLite uniquement pour un démarrage rapide.

## Démarrage avec Docker

```bash
copy .env.example .env
docker compose up --build
```

Sous macOS/Linux, utilisez `cp` à la place de `copy`.

- application : <http://localhost:8080>
- administration : <http://localhost:8080/admin/>
- OpenAPI interactif : <http://localhost:8080/api/v1/docs/>
- health check : <http://localhost:8080/api/v1/health/>

Le démarrage attend PostgreSQL, applique les migrations et exécute le seed
idempotent. Les valeurs de démonstration ne doivent jamais être réutilisées en
production.

## Démarrage local sans Docker

Backend PowerShell :

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements-dev.txt
$env:DEMO_ADMIN_PASSWORD="ChangeMe-OnlyForLocal-2026!"
.\.venv\Scripts\python.exe backend\manage.py migrate
.\.venv\Scripts\python.exe backend\manage.py seed_demo
.\.venv\Scripts\python.exe backend\manage.py runserver 127.0.0.1:8000
```

Frontend, dans un second terminal :

```powershell
cd frontend
npm ci
npm run dev
```

L’application locale est alors sur <http://127.0.0.1:3000>. Sans `DATABASE_URL`,
Django utilise `backend/db.sqlite3`.

## Variables d’environnement

Copiez `.env.example`. Les variables principales sont :

- `DJANGO_SECRET_KEY` : secret aléatoire, injecté par le gestionnaire de secrets ;
- `DJANGO_DEBUG` : toujours `false` hors développement ;
- `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS` et
  `DJANGO_CORS_ALLOWED_ORIGINS` : listes explicites ;
- `DATABASE_URL` : URL PostgreSQL ;
- `NEXT_PUBLIC_API_URL` : URL API visible du navigateur ;
- `DEMO_ADMIN_EMAIL` et `DEMO_ADMIN_PASSWORD` : développement uniquement.

## Commandes de qualité

```bash
# backend
cd backend
pytest --cov=apps --cov-report=term-missing
ruff check .
python manage.py check --deploy
python manage.py spectacular --file schema.yml --validate

# frontend
cd frontend
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Le `Makefile` expose également `make dev`, `make test`, `make lint`,
`make typecheck`, `make build` et `make audit`. Les commandes locales du Makefile
emploient les chemins POSIX ; sous Windows, utilisez les commandes PowerShell
ci-dessus ou Docker.

## Authentification et administration

L’authentification repose sur la session Django : cookie `HttpOnly`, `Secure` en
production, `SameSite=Lax`, jeton CSRF séparé et limitation de débit sur les
endpoints de connexion. Aucun jeton n’est stocké dans `localStorage`.

Le compte administrateur de démonstration est
`admin@komandgo.local / ChangeMe-OnlyForLocal-2026!`. Le compte client est
`demo@komandgo.local / Demo-Customer-2026!`. Ce sont des secrets locaux jetables.
En production, créez un compte avec `python manage.py createsuperuser`.

## Production

Consultez [docs/deployment.md](docs/deployment.md). En particulier : remplacez
tous les secrets, terminez TLS au niveau du load balancer, exécutez les migrations
dans une tâche unique, retirez le seed, sauvegardez PostgreSQL et centralisez logs
et alertes.

## Limites connues

- pas de paiement ni de service de livraison externe ;
- pas encore de zones de livraison géographiques ni de créneaux horaires ;
- cycle de commande géré dans Django Admin, sans temps réel ni notifications ;
- images de démonstration locales ; le stockage objet/CDN est à configurer ;
- gestion autonome du mot de passe et suppression de compte à ajouter avant un
  lancement grand public.

Voir aussi [l’analyse historique](docs/legacy-analysis.md),
[l’architecture](docs/architecture.md), [l’audit de sécurité](docs/security-audit.md)
et le [rapport final](docs/final-report.md).
