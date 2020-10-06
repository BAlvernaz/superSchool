from django.urls import path
from students import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('students/', views.StudentList.as_view()),
    path('students/<str:pk>/', views.StudentDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)