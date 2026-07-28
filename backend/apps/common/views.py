from django.db import connection
from django.http import JsonResponse


def health(request):  # noqa: ANN001, ARG001
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        cursor.fetchone()
    return JsonResponse({"status": "ok"})
