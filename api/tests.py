from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import School, Student
from .views import SchoolList, UserCreation
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your tests here.

class UserandAuthenicationTest(TestCase):
    def setUp(self):
        self.school1 = School.objects.create(name="Test School 1")
    def test_create_user(self):
      testStudentUser = get_user_model().objects.create_user( email="Test@test.com", password="password", first_name="Test", last_name="Testy", is_student=True, image="No Image", school=self.school1)
      self.assertEqual(testStudentUser.get_full_name(), "Test Testy")
      self.assertTrue(testStudentUser.is_student)
      self.assertEqual(len(Student.objects.all()), 1)


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
    def test_register_api(self):
        request = self.factory.post('/api/register/', 
        { "email":"test@test.com", 
          "password":"password", 
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "school": self.school1.id, 
          "image": "No Image"}, 
          format="json")
        response = UserCreation.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(User.objects.all()), 1)
        self.assertEqual(len(Student.objects.all()), 1)
        self.assertEqual(response.data['first_name'], "Blake")

        

    
