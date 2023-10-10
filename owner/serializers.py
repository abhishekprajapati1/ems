from rest_framework import serializers
from .models import Owner

class OwnerCreateReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', "full_name", "email", "phone_number", "password", "pin", "company_name"]
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8},  # Password should be write-only
            'pin': {'write_only': True},  # Pin should be write-only
        }
