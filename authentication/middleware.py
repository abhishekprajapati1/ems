from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from rest_framework import exceptions
from utils.auth import should_authenticate


class TokenRenewalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not should_authenticate(request):
            return self.get_response(request)

        access_token = request.COOKIES.get('access_token')

        if not access_token:
            msg = _('Access denied')
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = AccessToken(access_token)
        except:
            token = None

        if token:
            current_time = timezone.now().timestamp()
            access_token_expiration = token.payload['exp']

            if (access_token_expiration - current_time) <= 100:
                refresh_token = request.COOKIES['refresh_token']
                refresh = RefreshToken(refresh_token)
                request.COOKIES['access_token'] = str(refresh.access_token)
                request.COOKIES['refresh_token'] = str(refresh)
                return self.get_response(request)
        else:
            refresh_token = request.COOKIES['refresh_token']
            refresh = RefreshToken(refresh_token)
            request.COOKIES['access_token'] = str(refresh.access_token)
            request.COOKIES['refresh_token'] = str(refresh)
            return self.get_response(request)

        return self.get_response(request)