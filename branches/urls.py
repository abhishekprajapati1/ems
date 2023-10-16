from django.urls import path
from .views import ListOrCreateView, DetailView


urlpatterns = [
    path('', ListOrCreateView.as_view(), name="branches"),
    path('<int:pk>/', DetailView.as_view(), name="branch-details"),
]