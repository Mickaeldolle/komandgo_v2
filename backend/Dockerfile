FROM ghcr.io/astral-sh/uv:0.11.21 AS uv
FROM python:3.11-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

COPY --from=uv /uv /uvx /bin/

WORKDIR /app

RUN groupadd --system komandgo && useradd --system --gid komandgo --home /app komandgo

COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-dev --no-install-project

COPY . .
RUN mkdir -p /app/staticfiles /app/media && \
    chown -R komandgo:komandgo /app && \
    uv run --no-dev python manage.py collectstatic --noinput

USER komandgo
EXPOSE 8000

CMD ["uv", "run", "--no-dev", "gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "30", "--access-logfile", "-", "--error-logfile", "-"]
