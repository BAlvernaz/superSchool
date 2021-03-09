from rest_framework import permissions

class isAuthenticatedStudent(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
      print(request.user.profile.id)
      print(obj.profile.id)
      return obj.id == request.user.profile.id