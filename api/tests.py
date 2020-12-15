from django.db import reset_queries
from django.http import response
from django.test import TestCase, client
from rest_framework.test import APIRequestFactory
from .models import School, Student
from .views import SchoolList, UserCreation
from django.contrib.auth import get_user_model
from dj_rest_auth.views import LoginView
from rest_framework.test import APIClient

User = get_user_model()
client = APIClient()
# Create your tests here.

class UserandAuthenicationTest(TestCase):
    def setUp(self):
        self.school1 = School.objects.create(name="Test School 1")
    def test_create_user(self):
      testStudentUser = User.objects.create_user( email="Test@test.com", password="password", first_name="Test", last_name="Testy", is_student=True, image="No Image", school=self.school1)
      self.assertEqual(testStudentUser.get_full_name(), "Test Testy")
      self.assertTrue(testStudentUser.is_student)
      self.assertEqual(len(Student.objects.all()), 1)
    def test_create_superuser(self):
      testSuperUser = User.objects.create_superuser("super@super.com","password", first_name="Super", last_name="User", image="No Image", school=None)
      self.assertEqual(testSuperUser.get_full_name(), "Super User")
      self.assertTrue(testSuperUser.is_staff)
      self.assertTrue(testSuperUser.is_superuser)


class StudentsSchoolsApiTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.school1 = School.objects.create(name="Test School 1")
        School.objects.create(name="Test School 2")
        User.objects.create_user("testy@testy.com", "password")
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
    def test_register_api(self):
        response = client.post('/api/auth/reg/', 
        { "email":"test@test.com", 
          "password1":"10wer1232",
          "password2": "10wer1232",  
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "school": self.school1.id, 
          "image": "No Image",
          "is_student": True}, 
          format="json")
        print(response)
        self.assertEqual(response, {})
        self.assertEqual(len(User.objects.all()), 2)
        self.assertEqual(len(Student.objects.all()), 2)
        self.assertEqual(response.data['first_name'], "Blake")
    def test_login_api(self):
        response = client.post('/api/auth/login/', {"email":"testy@testy.com", "password":"password"})
        self.assertEqual(response.status_code, 200)
    
