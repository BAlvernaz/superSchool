from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import School, Student
from .views import SchoolList, SchoolDetail
import json
# Create your tests here.
class StudentsSchoolsApiTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        School.objects.create(name="Test School 1")
        self.uuid1 = School.objects.all()[0].id
        School.objects.create(name="Test School 2")
    def test_get_schools(self):
        request = self.factory.get('/api/schools/')
        response = SchoolList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
    def test_post_schools(self):
        request = self.factory.post('/api/schools',{"name": "Test School 3"}, format="json")
        response = SchoolList.as_view()(request)
        self.assertEqual(response.data['name'], "Test School 3")
        self.assertEqual(response.status_code, 201)
        