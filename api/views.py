from api.models import Student, School
from api.serializer import StudentSerializer, SchoolSerializer
from rest_framework import generics

# Create your views here.

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SchoolList(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer