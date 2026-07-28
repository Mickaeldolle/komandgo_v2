import pytest
from rest_framework.test import APIClient

from apps.accounts.models import User

from .factories import UserFactory


@pytest.mark.django_db
def test_registration_creates_authenticated_session():
    client = APIClient()
    response = client.post(
        "/api/v1/auth/register/",
        {
            "email": "new@example.test",
            "password": "Very-Strong-Test-Password-2026!",
            "first_name": "Nina",
            "last_name": "Durand",
        },
        format="json",
    )

    assert response.status_code == 201
    assert response.data["email"] == "new@example.test"
    assert User.objects.filter(email="new@example.test").exists()
    assert "_auth_user_id" in client.session


@pytest.mark.django_db
def test_login_does_not_reveal_which_credential_is_wrong():
    UserFactory(email="known@example.test")
    client = APIClient()

    unknown = client.post(
        "/api/v1/auth/login/",
        {"email": "unknown@example.test", "password": "wrong-password"},
        format="json",
    )
    wrong = client.post(
        "/api/v1/auth/login/",
        {"email": "known@example.test", "password": "wrong-password"},
        format="json",
    )

    assert unknown.status_code == 400
    assert wrong.status_code == 400
    assert unknown.data["error"]["message"] == wrong.data["error"]["message"]


@pytest.mark.django_db
def test_profile_requires_authentication_and_only_updates_safe_fields():
    client = APIClient()
    assert client.get("/api/v1/auth/me/").status_code == 403

    user = UserFactory(email="profile@example.test")
    client.force_authenticate(user)
    response = client.patch(
        "/api/v1/auth/me/",
        {"first_name": "Sam", "email": "attacker@example.test", "is_staff": True},
        format="json",
    )

    user.refresh_from_db()
    assert response.status_code == 200
    assert user.first_name == "Sam"
    assert user.email == "profile@example.test"
    assert user.is_staff is False


@pytest.mark.django_db
def test_csrf_is_required_for_session_mutations():
    user = UserFactory(email="csrf@example.test")
    client = APIClient(enforce_csrf_checks=True)
    client.force_login(user)

    without_token = client.patch(
        "/api/v1/auth/me/",
        {"first_name": "Blocked"},
        format="json",
    )
    assert without_token.status_code == 403

    csrf_response = client.get("/api/v1/auth/csrf/")
    token = csrf_response.cookies["csrftoken"].value
    with_token = client.patch(
        "/api/v1/auth/me/",
        {"first_name": "Allowed"},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert with_token.status_code == 200
