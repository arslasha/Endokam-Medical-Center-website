from django.contrib import admin
from .models import DoctorProfile, Slot, Appointment, Service

@admin.register(DoctorProfile)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'specialization')

@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'start_time', 'is_booked')
    list_filter = ('doctor', 'is_booked')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'slot', 'patient', 'guest_last_name')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')