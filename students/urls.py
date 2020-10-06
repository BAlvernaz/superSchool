from django.urls import path
from students import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('students/', views.student_list),
    path('students/<str:pk>', views.student_detail)
]

urlpatterns = format_suffix_patterns(urlpatterns)