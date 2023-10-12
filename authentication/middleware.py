from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta, timezone

class TokenRenewalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if hasattr(request, 'user') and request.user.is_authenticated:
            print(request.user)
            current_time = timezone.now()
            access_token_expiration = request.auth.payload['exp']

            if access_token_expiration - current_time <= timedelta(minutes=5):
                refresh = RefreshToken(request.auth)
                request.auth.access_token = str(refresh.access_token)
        
        response = self.get_response(request)
        return response