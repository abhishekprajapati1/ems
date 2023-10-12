from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Owner
from authentication.auth import CookieJWTAuthentication
from .serializers import OwnerUpdateDestroySerializer, OwnerReadSerializer

class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return OwnerReadSerializer
        else:
            return OwnerUpdateDestroySerializer