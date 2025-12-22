from rest_framework import serializers
from .models import DoctorProfile, Service, WorkingHours, Appointment
from django.contrib.auth import get_user_model
from datetime import timedelta

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'role']

class DoctorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    role = serializers.CharField(source='specialization')
    description = serializers.CharField(source='bio')

    class Meta:
        model = DoctorProfile
        fields = ['id', 'name', 'role', 'description']

    def get_name(self, obj):
        return f"{obj.user.last_name} {obj.user.first_name}"

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'description', 'duration_minutes']

class AppointmentCreateSerializer(serializers.ModelSerializer):
    # Мы принимаем ID сервиса и время начала строкой из фронтенда
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=DoctorProfile.objects.all())

    class Meta:
        model = Appointment
        fields = [
            'doctor', 'service', 'start_time',
            'guest_first_name', 'guest_last_name', 
            'guest_patronymic', 'guest_phone', 'guest_email'
        ]

    def create(self, validated_data):
        service = validated_data['service']
        start_time = validated_data['start_time']
        
        # Автоматически вычисляем время окончания на основе длительности услуги
        duration = timedelta(minutes=service.duration_minutes)
        validated_data['end_time'] = start_time + duration
        
        return super().create(validated_data)

    def validate(self, data):
        """
        Проверка: не занято ли уже это время?
        """
        doctor = data['doctor']
        service = data['service']
        start_time = data['start_time']
        end_time = start_time + timedelta(minutes=service.duration_minutes)

        # Ищем пересечения с другими записями этого врача
        overlapping_appointments = Appointment.objects.filter(
            doctor=doctor,
            start_time__lt=end_time,
            end_time__gt=start_time
        ).exists()

        if overlapping_appointments:
            raise serializers.ValidationError("Это время уже занято.")

        return data