from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer
from .backends import EmailPasswordBackend


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
                return Response(token, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Authentication Failed"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)