from __future__ import annotations

from typing import Any

from rest_framework.response import Response
from rest_framework.views import exception_handler


def api_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    response = exception_handler(exc, context)
    if response is None:
        return None

    detail = response.data
    if isinstance(detail, dict) and set(detail) == {"detail"}:
        message = str(detail["detail"])
        fields = None
    else:
        message = "Les données envoyées sont invalides."
        fields = detail

    response.data = {
        "error": {
            "code": getattr(exc, "default_code", "request_error"),
            "message": message,
            "fields": fields,
        }
    }
    return response
