from django.test import TestCase, client
from rest_framework.test import APIRequestFactory
from .models import School, Student
from .views import SchoolList
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()
client = APIClient()
# Create your tests here.

class UserandAuthenicationTest(TestCase):
    def setUp(self):
        self.school1 = School.objects.create(name="Test School 1")
    def test_create_superuser(self):
      testSuperUser = User.objects.create_superuser("super@super.com","password", first_name="Super", last_name="User", image="No Image")
      self.assertEqual(testSuperUser.get_full_name(), "Super User")
      self.assertTrue(testSuperUser.is_staff)
      self.assertTrue(testSuperUser.is_superuser)


class StudentsSchoolsApiTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.school1 = School.objects.create(name="Test School 1", image='no')
        self.school2 = School.objects.create(name="Test School 2")
        self.firstStudent =  User.objects.create_user("testy@testy.com", "password", self.school1.id)
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
          "password2":"10wer1232",
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "image": "No Image",
          "is_student": True,
          "school": self.school1.id},
          format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(User.objects.all()), 2)
        self.assertEqual(len(Student.objects.all()), 2)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.data['key'])
        response2 = client.get('/api/auth/user/')
        self.assertEqual(response2.data['first_name'], "Blake")
        self.assertEqual(response2.data['last_name'], "Alvernaz")
        self.assertEqual(response2.data['image'], "No Image")
        self.assertEqual(response2.data['email'], "test@test.com")

    def test_login_api(self):
        client.post('/api/auth/reg/', 
        { "email":"test@test.com", 
          "password1":"10wer1232",
          "password2":"10wer1232",
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "image": "No Image",
          "is_student": True,
          "school": self.school1.id},
          format="json")
        response = client.post('/api/auth/login/', {"email":"test@test.com", "password":"10wer1232"})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['key'])
        response2 = client.get('/api/auth/user/')
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.data['email'], "test@test.com")
    def test_edit_user(self):
        login = client.post('/api/auth/login/', {"email":"testy@testy.com", "password":"password"})
        self.assertEqual(login.status_code, 200)
        self.assertTrue(login.data['key'])
        user = client.get('/api/auth/user/')
        self.assertEqual(user.status_code, 200)
        self.assertEqual(user.data['email'], "testy@testy.com")
        response = client.put("/api/auth/user/", {"email": "testy@testy.com", "first_name": "New", "last_name": "Name", "profile": {}, "image": "No Image"}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], "testy@testy.com")
        self.assertEqual(response.data['first_name'], "New")
        user = client.get('/api/auth/user/')
        self.assertEqual(user.data["email"], "testy@testy.com")
        self.assertEqual(user.data["first_name"], "New")
    def test_change_school(self):
        createResponse = client.post('/api/auth/reg/', 
        { "email":"test@test.com", 
          "password1":"10wer1232",
          "password2":"10wer1232",
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "image": "No Image",
          "is_student": True,
          "is_teacher": False,
          "school": self.school1.id},
          format="json")
        self.assertEqual(createResponse.status_code, 201)
        self.assertTrue(createResponse.data['key'])
        editRes = client.put('/api/auth/user/', {"email":"test@test.com", 
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "image": "No Image",
          "profile" : {"gpa":1.0, "school": self.school2.id}}, format="json")
        self.assertEqual(editRes.status_code,200)
        self.assertEqual(editRes.data['profile']['school'], self.school2.id)
    def test_remove_student(self):
        client.post('/api/auth/reg/', 
        { "email":"test@test.com", 
          "password1":"10wer1232",
          "password2":"10wer1232",
          "first_name": "Blake",
          "last_name": "Alvernaz", 
          "image": "No Image",
          "is_student": True,
          "school": self.school1.id},
          format="json")
        client.post('/api/auth/reg/', 
        { "email":"test2@test.com", 
          "password1":"10wer1232",
          "password2":"10wer1232",
          "first_name": "John",
          "last_name": "Doe", 
          "image": "No Image",
          "is_student": True,
          "school": self.school1.id},
          format="json")
        self.assertEqual(len(Student.objects.all()), 3)
        self.assertEqual(len(User.objects.all()), 3)
        login = client.post('/api/auth/login/', {"email":"test@test.com", "password":"10wer1232"})
        user_info = client.get('/api/auth/user/')
        self.assertEqual(user_info.status_code, 200)
        self.assertEqual(user_info.data['email'], "test@test.com" )
        delete_res = client.delete('/api/students/{}/'.format(user_info.data['profile']['id']))
        self.assertEqual(delete_res.status_code, 204)
        self.assertEqual(len(Student.objects.all()), 2)
        self.assertEqual(len(User.objects.all()), 3)
        client.post('/api/auth/logout/')
        client.post('/api/auth/login/', {"email":"test2@test.com", "password":"10wer1232"})
        #No other Person should be able to delete another Student account
        failDelete = client.delete('/api/students/{}/'.format(self.firstStudent.profile.id))
        self.assertEqual(failDelete.status_code, 403)
        self.assertEqual(len(Student.objects.all()), 2)
        self.assertEqual(len(User.objects.all()), 3)

        


        
