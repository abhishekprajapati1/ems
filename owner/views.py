from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Owner
from authentication.auth import CookieJWTAuthentication
from .serializers import OwnerUpdateDestroySerializer, OwnerReadSerializer, OwnerUpdateSerializer
from utils.cookie import sendtoken

class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        sendtoken(req=request, res=response)
        return response

    def update(self, request, *args, **kwargs):
        if request.data.__contains__("email"):
            response = Response({"success": False, "message": "The 'email' field is not accesptable in this request."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            sendtoken(req=request, res=response)
            return response
        
        response = super().update(request, *args, **kwargs)
        sendtoken(req=request, res=response)
        return response

    def get_serializer_class(self):
        if self.request.method == "GET":
            return OwnerReadSerializer
        elif self.request.method == "PATCH":
            return OwnerUpdateSerializer
        else:
            return OwnerUpdateDestroySerializer
        
