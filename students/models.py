import uuid
from django.db import models

# Create your models here.

class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)

class Student(models.Model):
    id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    school = models.ForeignKey(School, related_name="students", on_delete=models.CASCADE, blank=True)