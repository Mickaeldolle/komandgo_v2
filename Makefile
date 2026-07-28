.PHONY: install dev stop migrate seed test lint typecheck build audit clean

install:
	python -m venv .venv
	.venv/bin/pip install -r backend/requirements-dev.txt
	cd frontend && npm ci

dev:
	docker compose up --build

stop:
	docker compose down

migrate:
	cd backend && python manage.py migrate

seed:
	cd backend && python manage.py seed_demo

test:
	cd backend && pytest --cov=apps --cov-report=term-missing
	cd frontend && npm test

lint:
	cd backend && ruff format --check .
	cd backend && ruff check .
	cd frontend && npm run lint

typecheck:
	cd frontend && npm run typecheck

build:
	cd frontend && npm run build
	docker compose build

audit:
	cd backend && pip-audit -r requirements.txt
	cd frontend && npm audit --audit-level=high

clean:
	docker compose down --remove-orphans
