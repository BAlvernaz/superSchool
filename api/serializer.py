from rest_framework import serializers
from api.models import Student, School

class UserSerializer(serializers.ModelSerializer):
  pass
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ['id', 'school', 'gpa', 'image']

class SchoolSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, required=False)
    class Meta:
      model = School
      fields = ['id', 'name', 'students', 'image' ]
