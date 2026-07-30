.PHONY: install dev stop migrate seed test lint typecheck build audit clean

install:
	cd backend && uv sync --dev
	cd frontend && npm ci

dev:
	docker compose up --build

stop:
	docker compose down

migrate:
	cd backend && uv run python manage.py migrate

seed:
	cd backend && uv run python manage.py seed_demo

test:
	cd backend && uv run pytest --cov=apps --cov-report=term-missing
	cd frontend && npm test

lint:
	cd backend && uv run ruff format --check .
	cd backend && uv run ruff check .
	cd frontend && npm run lint

typecheck:
	cd frontend && npm run typecheck

build:
	cd frontend && npm run build
	docker compose build

audit:
	cd backend && uv run pip-audit
	cd frontend && npm audit --audit-level=high

clean:
	docker compose down --remove-orphans
