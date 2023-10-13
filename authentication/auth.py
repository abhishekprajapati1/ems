from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import get_user_model

User = get_user_model()

class CookieJWTAuthentication(JWTAuthentication):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    def authenticate(self, request):
        token = request.COOKIES['access_token']
        user = None
        if not token:
            msg = _('Login first')
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = AccessToken(token=token)
            user = self.get_user(token)
        except TokenError:
            raise exceptions.AuthenticationFailed(_('Invalid token.'))

        # if not token.user.is_active:
        #     raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))
        print(token['user_id'], user.id)
        return (user, token)

    def get_validated_token(self, raw_token):
        return super().get_validated_token(raw_token=raw_token)
    
    def get_user(self, validated_token):
        user = User.objects.get(id=validated_token['user_id'])
        return user
    