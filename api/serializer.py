from rest_framework import serializers
from api.models import Student, School
from django.contrib.auth import get_user_model

User = get_user_model()

#Student Profile - Using User
class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "image", "email"]
    
class StudentSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
      model = Student
      fields = ["gpa", "profile", "id", 'school']

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
      model = School
      fields = ['id', 'name', 'image' ]


class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  school = serializers.CharField()
  is_student = serializers.BooleanField(default=True)
  is_teacher = serializers.BooleanField(default=False)
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


  class Meta:
    model = User
    fields = ['first_name', 'last_name', 'email', 'password', 'image', 'school', 'is_student', 'is_teacher']


      #Customizing DJ-REST-AUTH - Not Quite Working as Expected

# class CustomRegisterSerializer(RegisterSerializer):
#    first_name = serializers.CharField(required=True, write_only=True)
#    last_name = serializers.CharField(required=True, write_only=True)
#    password1 = serializers.CharField(required=True, write_only=True)
#    password2 = serializers.CharField(required=True, write_only=True)
#    is_student = serializers.BooleanField(default=True, write_only=True)
#    is_teacher = serializers.BooleanField(default=False, write_only=True)
#    school = SchoolSerializer(many=False, required=False)


#    class Meta:
#         model = User
#         fields = ['email', 'first_name','last_name',
#         'password', 'password2', 'is_student', 'is-teacher', 'school']
#         extra_kwargs = {
#             'password': {
#                 'write_only':True
#             }
#         }
#    def save(self, request):
#       print(self)
#       password1 = self.validated_data['password1']
#       password2 = self.validated_data['password2']
#       if password1 != password2:
#             raise serializers.ValidationError({'password':'Passwords must match.'})
#       user = User.objects.create_user(self.validated_data['email'],
#                  self.validated_data['password2'],
#                  self.validated_data["school"],   
#                  first_name=self.validated_data['first_name'],
#                  last_name=self.validated_data['last_name'],
#                  is_teacher=self.validated_data['is_teacher'],
#                  is_student=self.validated_data['is_student'],
#                  school=self.validated_data['school'])
#       return user


