import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


from django.contrib.auth.base_user import BaseUserManager


# Create your models here.

class UserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, email, first_name, last_name, password=None, is_student=False, is_admin=False, isStaff=False, data=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")
        if is_student:
            Student.objects.create(request.school, request.gpa, request.image)
            Student.save(using=self._db)

        user = self.model(
            email=self.normalize_email(email)
        )
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.is_staff = False
        user.save(using=self._db)
        return user
        


class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

class Student(models.Model):
    id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, related_name="students", on_delete=models.CASCADE, blank=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2)
    image = models.CharField(max_length=255)

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    student_profile = models.OneToOneField(Student, related_name="student_profile", on_delete=models.CASCADE, null=True, blank=True)