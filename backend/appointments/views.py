from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import DoctorProfile, Slot, Appointment, Service
from .serializers import DoctorSerializer, SlotSerializer, AppointmentCreateSerializer, ServiceSerializer

class AppointmentViewSet(viewsets.ViewSet):
    
    # Получить список всех врачей
    @action(detail=False, methods=['get'])
    def doctors(self, request):
        doctors = DoctorProfile.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    # Получить свободные даты/слоты для конкретного врача
    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date_str = request.query_params.get('date') # Формат YYYY-MM-DD
        
        slots = Slot.objects.filter(
            doctor_id=doctor_id, 
            start_time__date=date_str, 
            is_booked=False
        )
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

    # Создать запись (для гостя или юзера)
    @action(detail=False, methods=['post'])
    def book(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Помечаем слот как занятый
            slot = serializer.validated_data['slot']
            slot.is_booked = True
            slot.save()
            serializer.save()
            return Response({"message": "Запись успешно создана"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def services(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)