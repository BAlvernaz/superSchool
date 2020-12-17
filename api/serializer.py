from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from api.models import Student, School
from django.contrib.auth import get_user_model
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator

from dj_rest_auth.registration.serializers import RegisterSerializer
User = get_user_model()

    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Student
      fields = ["gpa", "profile", "id"]

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  student = StudentSerializer(many=False, required=False)

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
    fields = ['first_name', 'last_name', 'email', 'password', 'school', 'image', 'student']

class SchoolSerializer(serializers.ModelSerializer):
    personnel = UserSerializer(many=True, required=False)
    class Meta:
      model = School
      fields = ['id', 'name', 'personnel', 'image' ]

      #Customizing DJ-REST-AUTH

class CustomRegisterSerializer(RegisterSerializer):
   first_name = serializers.CharField(required=True, write_only=True)
   last_name = serializers.CharField(required=True, write_only=True)
   password1 = serializers.CharField(required=True, write_only=True)
   password2 = serializers.CharField(required=True, write_only=True)
   is_student = serializers.BooleanField(default=True, write_only=True)
   is_teacher = serializers.BooleanField(default=False, write_only=True)


   class Meta:
        model = User
        fields = ['email', 'first_name','last_name',
        'password', 'password2', 'is_student', 'is-teacher']
        extra_kwargs = {
            'password': {
                'write_only':True
            }
        }
   def save(self, request):
      user = User(email=self.validated_data['email'],
                 first_name=self.validated_data['first_name'],
                 last_name=self.validated_data['last_name'],
                 is_teacher=self.validated_data['is_teacher'],
                 is_student=self.validated_data['is_student'])
      password1 = self.validated_data['password1']
      password2 = self.validated_data['password2']
      if password1 != password2:
            raise serializers.ValidationError({'password':'Passwords must match.'})
      user.set_password(password1)
      user.save()
      return user




