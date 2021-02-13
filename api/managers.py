
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, school, **extra_fields):
        if not email:
            raise ValueError("Email must be Set")
        if extra_fields.get("is_staff") is not True and extra_fields.get("is_superuser") is not True:
            extra_fields.setdefault("is_student", True)
            extra_fields.setdefault("is_teacher", False)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.school = school
        user.set_password(password)
        
        user.save()
        return user
    def create_superuser(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email Is Required")
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, None, **extra_fields)
