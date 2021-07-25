from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils.translation import gettext_lazy as _
# Create your models here.
class User(AbstractUser):
    name=models.CharField(max_length=255)
    email=models.CharField(max_length=255,unique=True)
    password=models.CharField(max_length=255)

    CUSTOMER = 1
    ADMIN = 2

    STATUS = (
       (CUSTOMER, _('Normal Customer')),
       (ADMIN, _('Admin')),
   )
   # […]
    status = models.PositiveSmallIntegerField(
       choices=STATUS,
       default=CUSTOMER,
  )

    username=None
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
