from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from students.models import Student
from students.serializer import StudentSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def student_list(request, format=None):
    if request.method == "GET":
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def student_detail(request, pk, format=None):
    try:
        student = Student.objects.get(pk=pk)
        print(Student.objects.get(pk="021dc8f2-6a85-4865-b067-7cfb8724457d"))
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = StudentSerializer(student, data=data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status.HTTP_204_NO_CONTENT)