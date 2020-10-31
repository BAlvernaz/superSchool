from rest_framework import serializers
from api.models import Student, School

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ['id', 'name', 'school', 'gpa', 'image']

class SchoolSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, required=False)
    class Meta:
      model = School
      fields = ['id', 'name', 'students', 'image' ]
