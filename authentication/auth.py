from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth import get_user_model

User = get_user_model()

class CookieJWTAuthentication(JWTAuthentication):
    def __call__(self, request):
        # Access the request object here
        print("Accessing the request object")

        return super().__call__(request)



    def get_validated_token(self, raw_token):

        print(super().get_validated_token(raw_token))
        return raw_token
    
    def get_user(self, validated_token):
        user = User.objects.get(id=validated_token['user_id'])
        return user