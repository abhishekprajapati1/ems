from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from owner.models import Owner

class EmailPasswordBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = Owner.objects.get(email=email)
            if check_password(password, user.password):
                return user
        except Owner.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Owner.objects.get(pk=user_id)
        except Owner.DoesNotExist:
            return None