from rest_framework.generics import ListAPIView
from .models import Employee

class ListEmployeesView(ListAPIView):
    queryset = Employee.objects.all()