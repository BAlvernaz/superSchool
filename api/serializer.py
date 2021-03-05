from rest_framework import serializers
from api.models import Student, School
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer 
from django.contrib.auth import get_user_model
from django.contrib.auth import  get_user_model
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email



User = get_user_model()



  

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "image", "email"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ["gpa","id", 'school']

class StudentProfileSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
      model = Student
      fields = ["id", 'gpa', 'school', 'profile']


class UserDetailsSerializer(UserDetailsSerializer):
  profile = StudentSerializer()
  image = serializers.CharField()

  class Meta(UserDetailsSerializer.Meta):
    fields = UserDetailsSerializer.Meta.fields + ('profile', 'image')
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
   first_name = serializers.CharField()
   last_name = serializers.CharField()
   image = serializers.CharField()
   school = serializers.CharField()

   def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.school = self.validated_data.get('school', '')
        user.image = self.validated_data.get('image', "")
        user.is_student = self.validated_data.get("is_student", True)
        user.is_Teacher = self.validated_data.get("is_teacher", '')
        print(user)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user