from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer, SignupSerializer, CredentialsSerializers
from .backends import EmailPasswordBackend
from owner.models import Owner
from owner.serializers import OwnerReadSerializer


class LoginView(APIView):
    authentication_classes = [EmailPasswordBackend]
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                user = authenticate(request, email=email, password=password)
                login(request, user)
                refresh = RefreshToken.for_user(user)
                token = {
                    'refresh': str(refresh),
                    'access_token': str(refresh.access_token)
                }
                response = Response({'success': True, 'data': token, 'message': "Logged in successfully."}, status=status.HTTP_200_OK)
                response.set_cookie(key='access_token', value=str(refresh.access_token), max_age=24*60*60, secure=True, httponly=True)
                response.set_cookie(key='refresh_token', value=str(refresh), max_age=24*60*60, secure=True, httponly=True)
                return response
            except Exception as e:
                return Response({"success": False, "message": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SignupView(generics.CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, *kwargs)
        except Exception as e:
            response = Response({'success': False, "message": str(e)})
        
        response.data = {'success': True, 'message': "Account created successfully.", "data": response.data}
        return response

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

class DetailsView(APIView):
    serializer_class = OwnerReadSerializer
    
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = self.serializer_class(user)  # Serialize the Owner instance
            data = serializer.data 
            response = Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            response = Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return response
    


class UpdateCredentialView(APIView):

    def patch(self, request, format=None):
        serializer = CredentialsSerializers(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            pin = serializer.validated_data['pin']
        response = Response({'success': True, 'message': "This api is working"}, status=status.HTTP_200_OK)
        return response