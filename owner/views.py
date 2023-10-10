from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Owner
from .serializers import OwnerCreateReadSerializer

class OwnerRegistrationView(generics.ListCreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerCreateReadSerializer
    # authentication_classes = [TokenAuthentication]  # Add authentication
    permission_classes = [IsAuthenticated]  # Add permission


    def perform_create(self, serializer):
        # Get the password and PIN from the request data
        password = serializer.validated_data.get('password')
        pin = serializer.validated_data.get('pin')
        
        # Hash the password and PIN before saving
        hashed_password = make_password(password)
        hashed_pin = make_password(pin)
        
        # Update the serializer data with the hashed values
        serializer.validated_data['password'] = hashed_password
        serializer.validated_data['pin'] = hashed_pin

        # Save the owner record
        serializer.save()


class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerCreateReadSerializer
    permission_classes = [IsAuthenticated]