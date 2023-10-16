from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.utils import timezone


class TokenRenewalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not self.should_renew_token(request):
            return self.get_response(request)

        access_token = request.COOKIES.get('access_token')

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

    def should_renew_token(self, request):
        excluded_paths = ['/api/auth/login', '/api/auth/signup']
        return not any(request.path_info.startswith(path) for path in excluded_paths)
