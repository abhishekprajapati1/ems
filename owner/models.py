from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models
from django.utils import timezone

class OwnerManager(BaseUserManager):
    def create_user(self, email, full_name, company_name, phone_number, pin, password ):
        if not email:
            raise ValueError('The email field must be set')
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            full_name = full_name,
            company_name = company_name,
            phone_number = phone_number,
            pin = pin
        )
        user.set_password(password)
        user.save(using = self.db)
        return user

class Owner(AbstractBaseUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    pin = models.CharField(max_length=4)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = OwnerManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= ['full_name', 'company_name', "phone_number", 'pin']

    def __str__(self):
        return f'{self.full_name} ({self.email})'
