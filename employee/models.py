from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone

class Employee(AbstractBaseUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    date_invited = models.DateTimeField(default=timezone.now)
    date_joined = models.DateTimeField()
    password = models.CharField(max_length=255)
    pin = models.CharField(max_length=255)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return f'{self.full_name} ({self.email})'