from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import School, Student, User
from .views import SchoolList, SchoolDetail, StudentList, StudentDetail
from django.contrib.auth import get_user_model
import json
# Create your tests here.

class StudentsSchoolsApiTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.school1 = School.objects.create(name="Test School 1")
        School.objects.create(name="Test School 2")
    def test_get_schools(self):
        request = self.factory.get('/api/schools/')
        response = SchoolList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
    def test_post_schools(self):
        request = self.factory.post('/api/schools/',{"name": "Test School 3", "image": "No Image"}, format="json")
        response = SchoolList.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(School.objects.all()), 3)

        
class UserandAuthenicationTest(TestCase):
    def setUp(self):
        self.school1 = School.objects.create(name="Test School 1")
    def test_create_user(self):
      student_profile = Student.objects.create(school=self.school1, gpa=4.0 , image="No Image")
      testStudentUser = get_user_model().objects.create( email="Test@test.com", password="password", first_name="Test", last_name="Testy", is_student=True, student_profile=student_profile)
      self.assertEqual(testStudentUser.get_full_name(), "Test Testy")
      self.assertTrue(testStudentUser.is_student)
