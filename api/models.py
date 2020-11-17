import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


from .managers import CustomUserManager


# Create your models here.

class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

class Student(models.Model):
    id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, related_name="students", on_delete=models.CASCADE, blank=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2)
    image = models.CharField(max_length=255)

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    

    student_profile = models.OneToOneField(Student, related_name="student_profile", on_delete=models.CASCADE, null=True, blank=True)

    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def get_full_name(self):
       return "{} {}".format(self.first_name, self.last_name)
