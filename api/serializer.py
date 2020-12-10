from rest_framework import serializers
from api.models import Student, School
from django.contrib.auth import get_user_model

User = get_user_model()


    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ["gpa", "profile", "id"]
      
class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  student_profile = StudentSerializer(many=False, required=False)
  def create(self, validated_data):
    user = User.objects.create_user(
      validated_data['email'],
      validated_data['password'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      school = validated_data['school'],
      image = validated_data['image']
    )
    return user
  class Meta:
    model = User
    fields = ['first_name', 'last_name', 'email', 'password', 'school', 'image', 'student_profile']

class SchoolSerializer(serializers.ModelSerializer):
    personnel = UserSerializer(many=True, required=False)
    class Meta:
      model = School
      fields = ['id', 'name', 'personnel', 'image' ]




