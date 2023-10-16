from typing import Any
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from utils.auth import should_authenticate

User = get_user_model()

class CookieJWTAuthentication(JWTAuthentication):
    """
        A Cookie based authentication plugin that verifies token sent in cookies
    """
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


    def authenticate(self, request):

        if not should_authenticate(request):
            return None, None

        token = request.COOKIES.get("access_token")
        validated_token = None

        if not token:
            msg = _('Access denied')
            raise exceptions.AuthenticationFailed(msg)

        try:
            validated_token = super().get_validated_token(raw_token=token)
        except:
            raise exceptions.AuthenticationFailed(_("Please provide a valid authentication token"))
        

        return self.get_user(validated_token), validated_token
    
    def get_user(self, validated_token):
        user = User.objects.get(id=validated_token['user_id'])
        user.owner_id = user.id
        return user
    