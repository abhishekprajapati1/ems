from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer, SignupSerializer
from .backends import EmailPasswordBackend
from owner.models import Owner


class LoginView(APIView):
    authentication_classes = [EmailPasswordBackend]
    
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if(serializer.is_valid()):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                token = {
                    'refresh': str(refresh),
                    'access_token': str(refresh.access_token)
                }
                response = Response(token, status=status.HTTP_200_OK)
                response.set_cookie(key='access_token', value=str(refresh.access_token), max_age=24*60*60, secure=True, httponly=True)
                response.set_cookie(key='refresh_token', value=str(refresh), max_age=24*60*60, secure=True, httponly=True)
                return response
            else:
                return Response({"message": "Authentication Failed"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SignupView(generics.CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = SignupSerializer

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