from django.urls import path
from .views import ListEmployeesView

urlpatterns=[
    path('', ListEmployeesView.as_view(), name="list-employees")
]