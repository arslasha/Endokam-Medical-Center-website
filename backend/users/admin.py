from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class MyUserAdmin(UserAdmin):
    # Добавляем наше поле 'role' и 'phone' в интерфейс админки
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительная информация', {'fields': ('role', 'phone')}),
    )
    list_display = ['username', 'email', 'role', 'is_staff']