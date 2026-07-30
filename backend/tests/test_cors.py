from rest_framework.test import APIClient


def test_checkout_preflight_allows_local_idempotency_header():
    response = APIClient().options(
        "/api/v1/orders/",
        HTTP_ORIGIN="http://localhost:3000",
        HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        HTTP_ACCESS_CONTROL_REQUEST_HEADERS=("content-type,x-csrftoken,idempotency-key"),
    )

    allowed_headers = {
        header.strip().lower() for header in response["Access-Control-Allow-Headers"].split(",")
    }

    assert response.status_code == 200
    assert response["Access-Control-Allow-Origin"] == "http://localhost:3000"
    assert {"content-type", "x-csrftoken", "idempotency-key"} <= allowed_headers
