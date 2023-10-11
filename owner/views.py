from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Owner
from .serializers import OwnerUpdateDestroySerializer, OwnerReadSerializer

class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return OwnerReadSerializer
        else:
            return OwnerUpdateDestroySerializer