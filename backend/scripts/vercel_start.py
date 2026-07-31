import os
import subprocess

if os.getenv("VERCEL_ENV") == "production":
    required = ("DATABASE_URL", "DJANGO_SECRET_KEY")
    missing = [name for name in required if not os.getenv(name)]

    if missing:
        raise SystemExit(f"Variables manquantes : {', '.join(missing)}")

    subprocess.run(
        ["uv", "run", "python", "manage.py", "migrate", "--noinput"],
        check=True,
    )
else:
    print("Migrations ignorées hors production.")
