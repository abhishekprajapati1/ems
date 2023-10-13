from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, TokenError
from datetime import timedelta
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework import status

class TokenRenewalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not self.should_renew_token(request):
            return self.get_response(request)
        
        access_token=request.COOKIES['access_token']

        if not access_token:
            raise exceptions.NotFound(_("No access token found."))

        try:
            token = AccessToken(access_token)
        except:
            token = None


        if token:
            current_time = timezone.now().timestamp()
            access_token_expiration = token.payload['exp']
            if (access_token_expiration - current_time) <= 100 :
                print("about to expire retrive new token")
                refresh_token = request.COOKIES['refresh_token']
                refresh = RefreshToken(refresh_token)
                response = Response(token, status=status.HTTP_200_OK)
                response.set_cookie(key='access_token', value=str(refresh.access_token), max_age=24*60*60, secure=True, httponly=True)
                response.set_cookie(key='refresh_token', value=str(refresh), max_age=24*60*60, secure=True, httponly=True)
                return self.get_response(request)
        else:
            print("expired retrive new token")
            refresh_token = request.COOKIES['refresh_token']
            refresh = RefreshToken(refresh_token)
            response = Response(token, status=status.HTTP_200_OK)
            response.set_cookie(key='access_token', value=str(refresh.access_token), max_age=24*60*60, secure=True, httponly=True)
            response.set_cookie(key='refresh_token', value=str(refresh), max_age=24*60*60, secure=True, httponly=True)
            return self.get_response(request)    
        

        return self.get_response(request)
    def should_renew_token(self, request):
        excluded_paths = ['/api/auth/login', '/api/auth/signup']
        return not any(request.path_info.startswith(path) for path in excluded_paths)