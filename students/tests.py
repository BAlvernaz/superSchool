from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import School, Student
from .views import SchoolList, SchoolDetail, StudentList, StudentDetail
import json
# Create your tests here.
class StudentsSchoolsApiTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.school1 = School.objects.create(name="Test School 1")
        School.objects.create(name="Test School 2")
        self.student1 = Student.objects.create(name="Test Student 1", school=self.school1)
        Student.objects.create(name="Test Student 2", school=self.school1)
    def test_get_schools(self):
        request = self.factory.get('/api/schools/')
        response = SchoolList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
    def test_post_schools(self):
        request = self.factory.post('/api/schools/',{"name": "Test School 3"}, format="json")
        response = SchoolList.as_view()(request)
        self.assertEqual(response.data['name'], "Test School 3")
        self.assertEqual(response.status_code, 201)
    def test_get_students(self):
        request = self.factory.get('/api/students/')
        response = StudentList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data),2)
    def test_post_student(self):
        request = self.factory.post('/api/students/', {"name": "Test Student Three", "school": self.school1.id})
        response = StudentList.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["name"], "Test Student Three")
        self.assertEqual(len(Student.objects.all()), 3)
    def test_put_student(self):
        request = self.factory.put('/api/students/', {"name": "Editted Student One", "school": self.school1.id})
        response = StudentDetail.as_view()(request, pk=self.student1.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Student.objects.all()), 2)
        self.assertEqual(response.data['name'], "Editted Student One")
        self.assertEqual(response.data['id'], str(self.student1.id))
    def test_delete_student(self):
        request = self.factory.delete('/api/students')
        response = StudentDetail.as_view()(request, pk=self.student1.id)
        self.assertEqual(response.status_code, 204)