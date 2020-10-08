from rest_framework import serializers
from students.models import Student, School

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ['id', 'name', 'school']

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
      model = School
      fields = ['id', 'name']
