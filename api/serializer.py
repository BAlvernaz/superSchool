from rest_framework import serializers
from api.models import Student, School
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer 
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()



  

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "image", "email"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ["gpa","id", 'school', 'profile']


class UserDetailsSerializer(UserDetailsSerializer):
  profile = StudentSerializer()
  class Meta(UserDetailsSerializer.Meta):
    fields = UserDetailsSerializer.Meta.fields + ('profile',)
  def update(self, instance, validated_data):
        userprofile_serializer = self.fields['profile']
        userprofile_instance = instance.profile
        userprofile_data = validated_data.pop('profile', {})
        print(userprofile_data)
        userprofile_serializer.update(userprofile_instance, userprofile_data)
        instance = super().update(instance, validated_data)
        return instance

    

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
      model = School
      fields = ['id', 'name', 'image' ]

class CustomRegisterSerializer(RegisterSerializer):
   is_student = serializers.BooleanField(default=True, write_only=True)
   is_teacher = serializers.BooleanField(default=False, write_only=True)
   school = serializers.CharField()
   
   @transaction.atomic
   def save(self, request):
       user = User.objects.create_user(self.validated_data.get('email', ""), self.validated_data.get('password', ""), self.validated_data.get('school', ""), is_student=self.validated_data.get('is_student', True), is_teacher=self.validated_data.get('is_teacher', False))
       return user


