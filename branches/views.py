from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import BranchListCreateSerializer, BranchUpdateSerializer
from .models import Branch
from owner.models import Owner
from authentication.auth import CookieJWTAuthentication


class ListOrCreateView(generics.ListCreateAPIView):
    queryset = Branch.objects.active()
    serializer_class = BranchListCreateSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except Exception as e:
            response = Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return response

    def perform_create(self, serializer):
        owner = Owner.objects.get(pk=self.request.user.owner_id)
        serializer.save(owner=owner)

class DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.active()
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return BranchUpdateSerializer
        else:
            return BranchListCreateSerializer
        
    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
