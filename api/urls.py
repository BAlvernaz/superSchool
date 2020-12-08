
from django.urls import path
from django.urls.conf import include
from api import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('students/', views.StudentList.as_view()),
    path('students/<str:pk>/', views.StudentDetail.as_view()),
    path('schools/', views.SchoolList.as_view()),
    path('schools/<str:pk>/', views.SchoolDetail.as_view()),
    path('register/', views.UserCreation.as_view()),
    path('login/',  include('dj_rest_auth.urls'))
]

urlpatterns = format_suffix_patterns(urlpatterns)