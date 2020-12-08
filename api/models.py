import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


from .managers import CustomUserManager


# Create your models here.

class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    school = models.ForeignKey(School, related_name="personnel", on_delete=models.CASCADE, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)

    is_staff = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = "email"

    objects = CustomUserManager()

    def get_full_name(self):
       return "{} {}".format(self.first_name, self.last_name)

class Student(models.Model):
    id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    profile = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    


