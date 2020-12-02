from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
User = get_user_model()
# Register your models here.

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'is_staff', 'is_student', 'is_teacher')
    list_filter = ('email',)
    fieldsets = (
        (None, {'fields': ('email',)}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_student', 'is_staff', 'is_teacher')}),
    )
    search_fields = ('email',)
    ordering = ('email',)
admin.site.register(User, UserAdmin)
