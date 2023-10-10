from django.urls import path
from .views import OwnerRegistrationView, OwnerDetailView


urlpatterns = [
    path("", OwnerRegistrationView.as_view(), name="owners-list"),
    path("<int:pk>/", OwnerDetailView.as_view(), name="details-view"),
]