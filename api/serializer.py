from rest_framework import serializers
from api.models import Student, School
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer 
from django.contrib.auth import get_user_model
from django.db import transaction
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model

try:
    from django.utils.translation import gettext_lazy as _
except ImportError:
    from django.utils.translation import gettext_lazy as _

from rest_framework import exceptions, serializers



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
       user = super().save(request)
       user.is_student= self.validated_data.get('is_student', True)
       user.is_teacher= self.validated_data.get('is_teacher', False)
       user.save()
       return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_email(self, email, password):
        user = None
        if email and password:
            user = self.authenticate(email=email, password=password)
            print(self.authenticate(email=email, password=password))
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = None
        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            # Authentication through email
            if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.EMAIL:
                user = self._validate_email(email, password)

        # Did we get back an inactive user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        # If required, is the email verified?
        if 'dj_rest_auth.registration' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
                try:
                    email_address = user.emailaddress_set.get(email=user.email)
                except:
                    raise serializers.ValidationError(_('E-mail is not registered.'))
                else:
                    if not email_address.verified:
                        raise serializers.ValidationError(_('E-mail is not verified.'))


        attrs['user'] = user
        return attrs
