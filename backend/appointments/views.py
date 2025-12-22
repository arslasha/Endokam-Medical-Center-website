from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, get_current_timezone
from .models import DoctorProfile, Appointment, Service, WorkingHours
from .serializers import DoctorSerializer, ServiceSerializer, AppointmentCreateSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
import re
from django.utils.timezone import now

class AppointmentViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_appointments(self, request):
        user = request.user
        
        if user.role == 'DOCTOR':
            # Врач видит записи, где он назначен доктором
            appointments = Appointment.objects.filter(doctor__user=user).order_by('start_time')
        else:
            # Пациент: очищаем телефон пользователя от лишних знаков для поиска
            user_phone = re.sub(r'\D', '', user.phone) # Оставляет только цифры
            
            # Ищем записи, где email совпадает ИЛИ телефон совпадает (тоже очищенный)
            # Примечание: в БД телефоны могут храниться по-разному, поэтому 
            # лучше искать по частичному совпадению или нормализовать при сохранении.
            appointments = Appointment.objects.filter(
                Q(guest_email__iexact=user.email) | 
                Q(guest_phone__contains=user_phone[-10:]) # Берем последние 10 цифр для надежности
            ).order_by('start_time')

        data = []
        for app in appointments:
            # Проверяем, как достать имя. 
            # Если в модели DoctorProfile есть поле 'name' - оставляем app.doctor.name
            # Если имя лежит в связанном User:
            doctor_name = getattr(app.doctor, 'name', None) 
            if not doctor_name:
                doctor_name = app.doctor.user.get_full_name() or app.doctor.user.username

            data.append({
                "id": app.id,
                "doctor_name": doctor_name, # Используем проверенную переменную
                "service_name": app.service.name,
                "start": app.start_time.isoformat(),
                "end": app.end_time.isoformat(),
                "patient_name": f"{app.guest_last_name} {app.guest_first_name}",
                "status": "предстоящая" if app.start_time > now() else "прошедшая"
            })
        return Response(data)
    

    @action(detail=False, methods=['get'])
    def doctors(self, request):
        doctors = DoctorProfile.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def services(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def working_days(self, request):
        doctor_id = request.query_params.get('doctor_id')
        if not doctor_id:
            return Response({"error": "Укажите doctor_id"}, status=400)
        days = WorkingHours.objects.filter(doctor_id=doctor_id).values_list('day_of_week', flat=True)
        return Response(list(set(days)))

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        doctor_id = request.query_params.get('doctor_id')
        service_id = request.query_params.get('service_id')
        date_str = request.query_params.get('date')

        if not all([doctor_id, service_id, date_str]):
            return Response({"error": "Недостаточно параметров"}, status=400)

        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            service = Service.objects.get(id=service_id)
            duration = timedelta(minutes=service.duration_minutes)
            tz = get_current_timezone()

            work_schedule = WorkingHours.objects.filter(
                doctor_id=doctor_id, 
                day_of_week=target_date.weekday()
            ).first()

            if not work_schedule:
                return Response([])

            # Делаем время "aware" (с часовым поясом)
            start_dt = make_aware(datetime.combine(target_date, work_schedule.start_time), tz)
            end_dt = make_aware(datetime.combine(target_date, work_schedule.end_time), tz)

            existing_apps = Appointment.objects.filter(
                doctor_id=doctor_id,
                start_time__date=target_date
            ).order_by('start_time')

            available_slots = []
            current_time = start_dt

            while current_time + duration <= end_dt:
                slot_end = current_time + duration
                
                # Проверка: не пересекается ли слот с существующими записями
                is_free = True
                for app in existing_apps:
                    # Условие пересечения интервалов:
                    if not (slot_end <= app.start_time or current_time >= app.end_time):
                        is_free = False
                        # Если занято, перепрыгиваем на конец этой записи
                        current_time = app.end_time 
                        break
                
                if is_free:
                    available_slots.append({
                        "time": current_time.strftime('%H:%M'),
                        "start": current_time.isoformat(),
                        "end": slot_end.isoformat()
                    })
                    # Шаг сетки — 20 минут
                    current_time += timedelta(minutes=20)
                else:
                    # Если было пересечение, current_time уже обновлен выше, 
                    # но на всякий случай проверяем, чтобы не войти в бесконечный цикл
                    if not is_free and current_time < slot_end:
                         current_time = slot_end

            return Response(available_slots)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(detail=False, methods=['post'])
    def book(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Запись создана"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)