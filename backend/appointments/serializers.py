from rest_framework import serializers
from .models import DoctorProfile, Slot, Appointment, Service
from users.models import User

class DoctorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name')
    role = serializers.CharField(source='specialization')
    description = serializers.CharField(source='bio')

    class Meta:
        model = DoctorProfile
        fields = ['id', 'name', 'role', 'description']

class SlotSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    class Meta:
        model = Slot
        fields = ['id', 'start_time', 'time', 'is_booked']

    def get_time(self, obj):
        return obj.start_time.strftime('%H:%M')

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'doctor', 'slot', 'patient', 
            'guest_first_name', 'guest_last_name', 
            'guest_patronymic', 'guest_phone', 'guest_email'
        ]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'