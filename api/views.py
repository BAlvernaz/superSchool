from api.models import Student, School
from api.serializer import StudentSerializer, SchoolSerializer, StudentProfileSerializer
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from api.permissions import isAuthenticatedStudent


User = get_user_model()

# Create your views here.

class StudentList(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.AllowAny]
    
class StudentCreate(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [isAuthenticatedStudent]

class SchoolList(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

# class UserCreation(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.AllowAny]
