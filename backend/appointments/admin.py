from django.contrib import admin
from .models import DoctorProfile, WorkingHours, Appointment, Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_minutes')
    search_fields = ('name',)

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization')
    search_fields = ('user__last_name', 'specialization')

@admin.register(WorkingHours)
class WorkingHoursAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'day_of_week', 'start_time', 'end_time')
    list_filter = ('day_of_week', 'doctor')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'start_time', 'guest_last_name', 'patient')
    list_filter = ('start_time', 'doctor')
    readonly_fields = ('end_time',) # Конец приема вычисляется автоматически, его лучше только читать