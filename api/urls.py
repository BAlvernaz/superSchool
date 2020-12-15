
from django.urls import path
from django.urls.conf import include
from api import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('students/', views.StudentList.as_view()),
    path('students/<str:pk>/', views.StudentDetail.as_view()),
    path('schools/', views.SchoolList.as_view()),
    path('schools/<str:pk>/', views.SchoolDetail.as_view()),
    path('auth/',  include('dj_rest_auth.urls')),
    path('auth/reg/', include('dj_rest_auth.registration.urls')),

]

urlpatterns = format_suffix_patterns(urlpatterns)