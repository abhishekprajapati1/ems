from django.urls import path
from .views import LoginView, SignupView, UpdateCredentialView, DetailsView

urlpatterns = [
    path('login/', LoginView.as_view(), name="login" ),
    path("signup/", SignupView.as_view(), name="signup"),
    path("details/", DetailsView.as_view(), name="details"),
    path("update-credentials/", UpdateCredentialView.as_view(), name="update-credentials")
]