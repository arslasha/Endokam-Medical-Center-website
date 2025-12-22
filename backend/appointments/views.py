from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import datetime, timedelta, time
from django.utils.timezone import make_aware
from .models import DoctorProfile, Appointment, Service, WorkingHours
from .serializers import DoctorSerializer, ServiceSerializer, AppointmentCreateSerializer

class AppointmentViewSet(viewsets.ViewSet):
    
    # 1. Получить список всех врачей
    @action(detail=False, methods=['get'])
    def doctors(self, request):
        doctors = DoctorProfile.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    # 2. Получить список всех услуг
    @action(detail=False, methods=['get'])
    def services(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    # 3. Получить дни, в которые врач работает (для календаря)
    @action(detail=False, methods=['get'])
    def working_days(self, request):
        doctor_id = request.query_params.get('doctor_id')
        if not doctor_id:
            return Response({"error": "doctor_id is required"}, status=400)
        
        # Получаем номера дней недели (0-6), в которые у врача есть график
        days = WorkingHours.objects.filter(doctor_id=doctor_id).values_list('day_of_week', flat=True)
        return Response(list(set(days)))

    # 4. Генерация доступных слотов времени
    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        doctor_id = request.query_params.get('doctor_id')
        service_id = request.query_params.get('service_id')
        date_str = request.query_params.get('date') # Формат YYYY-MM-DD

        if not all([doctor_id, service_id, date_str]):
            return Response({"error": "Missing parameters"}, status=400)

        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            service = Service.objects.get(id=service_id)
            duration = timedelta(minutes=service.duration_minutes)
            
            # Находим график врача на этот день недели
            day_of_week = target_date.weekday() # Django 0=Пн, ..., 6=Вс
            work_schedule = WorkingHours.objects.filter(doctor_id=doctor_id, day_of_week=day_of_week).first()

            if not work_schedule:
                return Response([]) # Врач не работает в этот день

            # Определяем границы рабочего дня
            start_dt = datetime.combine(target_date, work_schedule.start_time)
            end_dt = datetime.combine(target_date, work_schedule.end_time)

            # Получаем все СУЩЕСТВУЮЩИЕ записи к этому врачу на этот день
            # (Важно: в модели Appointment теперь должны быть поля start_time и end_time)
            existing_apps = Appointment.objects.filter(
                doctor_id=doctor_id,
                start_time__date=target_date
            ).order_by('start_time')

            available_slots = []
            current_time = start_dt

            # Алгоритм: идем от начала дня и проверяем, помещается ли услуга
            while current_time + duration <= end_dt:
                slot_end = current_time + duration
                
                # Проверяем, не пересекается ли этот интервал с другими записяos
                is_free = True
                for app in existing_apps:
                    # Условие пересечения интервалов
                    if not (slot_end <= app.start_time or current_time >= app.end_time):
                        is_free = False
                        # Если занято, прыгаем в конец этой записи
                        current_time = app.end_time
                        break
                
                if is_free:
                    available_slots.append({
                        "time": current_time.strftime('%H:%M'),
                        "start": current_time.isoformat(),
                        "end": slot_end.isoformat()
                    })
                    # Шаг сетки — например, 20 минут, чтобы записи не шли впритык или по длительности услуги
                    current_time += timedelta(minutes=20) 
                
            return Response(available_slots)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

    # 5. Создание записи
    @action(detail=False, methods=['post'])
    def book(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully booked"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)