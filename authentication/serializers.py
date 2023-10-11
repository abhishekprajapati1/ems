from rest_framework import serializers, serializers
from owner.models import Owner


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', "full_name", "email", "phone_number", "password", "pin", "company_name"]
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8},  # Password should be write-only
            'pin': {'write_only': True},  # Pin should be write-only
        }