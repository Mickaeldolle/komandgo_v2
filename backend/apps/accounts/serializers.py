from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    is_restaurateur = serializers.SerializerMethodField()

    def get_is_restaurateur(self, user: User) -> bool:
        return user.groups.filter(name="Restaurateurs").exists()

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "is_restaurateur",
        )
        read_only_fields = ("id", "email")


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=10, trim_whitespace=False)

    class Meta:
        model = User
        fields = ("id", "email", "password", "first_name", "last_name", "phone")
        read_only_fields = ("id",)

    def validate_password(self, value: str) -> str:
        from django.contrib.auth import password_validation

        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(trim_whitespace=False, write_only=True)

    def validate(self, attrs):
        from django.contrib.auth import authenticate

        user = authenticate(
            request=self.context.get("request"),
            email=attrs["email"].lower(),
            password=attrs["password"],
        )
        if user is None or not user.is_active:
            raise serializers.ValidationError("Adresse e-mail ou mot de passe incorrect.")
        attrs["user"] = user
        return attrs
