from rest_framework import serializers
from api.models import Student, School
from django.contrib.auth import get_user_model

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ['id', 'school', 'gpa', 'image']

class UserSerializer(serializers.ModelSerializer):
  student_profile = StudentSerializer(many=False, required=False)
  class Meta:
    model = get_user_model()
    fields = ['first_name', 'last_name', 'email', 'student_profile']

class SchoolSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, required=False)
    class Meta:
      model = School
      fields = ['id', 'name', 'students', 'image' ]