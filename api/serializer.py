from rest_framework import serializers
from api.models import Student, School
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer 
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

#Student Profile - Using User
# class Custom_User_Details_Serializer(UserDetailsSerializer):
#   class Meta(UserDetailsSerializer.Meta):
#     fields = UserDetailsSerializer.Meta.fields 
  

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "image", "email"]

class StudentSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
      model = Student
      fields = ["gpa", "profile", "id", 'school']
      read_only_fields = ("profile",)
    
      def update(self, instance, validated_data):
        print(" I need to get here")
        profile_serializer = self.fields['profile']
        profile_instance = instance.profile
        profile_data = validated_data.pop('profile', {})
        print("Got Here")

        profile_serializer.update(profile_instance, profile_data)
        
        return super().update(instance, validated_data)
    

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
      model = School
      fields = ['id', 'name', 'image' ]




# # class UserSerializer(serializers.ModelSerializer):
# #   password = serializers.CharField(write_only=True)
# #   school = serializers.CharField()
# #   is_student = serializers.BooleanField(default=True)
# #   is_teacher = serializers.BooleanField(default=False)

# #   # def create(self, validated_data):
# #   #   user = User.objects.create_user(
# #   #     validated_data['email'],
# #   #     validated_data['password'],
# #   #     validated_data['school'],
# #   #     first_name=validated_data['first_name'],
# #   #     last_name=validated_data['last_name'],
# #   #     image = validated_data['image'],
# #   #     is_student = validated_data['is_student'],
# #   #     is_teacher = validated_data['is_teacher'],
# #   #   )
# #   #   return user
  


#   class Meta:
#     model = User
#     fields = ['first_name', 'last_name', 'email', 'password', 'image', 'school', 'is_student', 'is_teacher', 'id']


      #Customizing DJ-REST-AUTH - Not Quite Working as Expected

class CustomRegisterSerializer(RegisterSerializer):
   is_student = serializers.BooleanField(default=True, write_only=True)
   is_teacher = serializers.BooleanField(default=False, write_only=True)
   school = serializers.CharField()
   
   def create(self, validated_data):
      user = User.objects.create_user(
      validated_data['email'],
      validated_data['password'],
      validated_data['school'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      image = validated_data['image'],
      is_student = validated_data['is_student'],
      is_teacher = validated_data['is_teacher'],
    )
      return user

   @transaction.atomic
   def save(self, request):
       user = User.objects.create_user(self.validated_data.get('email', ""), self.validated_data.get('password', ""), self.validated_data.get('school', ""), is_student=self.validated_data.get('is_student', True), is_teacher=self.validated_data.get('is_teacher', False))
       return user


