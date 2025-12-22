from django.db import models
from django.conf import settings
from datetime import timedelta

class Service(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название услуги")
    price = models.CharField(max_length=50, verbose_name="Цена")
    description = models.TextField(verbose_name="Описание")
    duration_minutes = models.PositiveIntegerField(
        default=30, 
        help_text="Сколько минут длится процедура",
        verbose_name="Длительность (мин)"
    )

    def __clstr__(self):
        return f"{self.name} ({self.duration_minutes} мин)"

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"


class DoctorProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='doctor_profile',
        limit_choices_to={'role': 'DOCTOR'}
    )
    specialization = models.CharField(max_length=255, verbose_name="Специализация")
    bio = models.TextField(blank=True, verbose_name="О враче")

    def __str__(self):
        return f"Д-р {self.user.last_name} ({self.specialization})"

    class Meta:
        verbose_name = "Профиль врача"
        verbose_name_plural = "Профили врачей"


class WorkingHours(models.Model):
    DAYS_OF_WEEK = [
        (0, 'Понедельник'),
        (1, 'Вторник'),
        (2, 'Среда'),
        (3, 'Четверг'),
        (4, 'Пятница'),
        (5, 'Суббота'),
        (6, 'Воскресенье'),
    ]
    
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='working_hours')
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK, verbose_name="День недели")
    start_time = models.TimeField(verbose_name="Начало работы")
    end_time = models.TimeField(verbose_name="Конец работы")

    class Meta:
        verbose_name = "График работы"
        verbose_name_plural = "Графики работы"
        unique_together = ('doctor', 'day_of_week')

    def __str__(self):
        return f"{self.doctor.user.last_name} | {self.get_day_of_week_display()}"


class Appointment(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name="Услуга")
    
    # Время начала и конца вычисляется динамически
    start_time = models.DateTimeField(verbose_name="Время начала")
    end_time = models.DateTimeField(verbose_name="Время окончания")
    
    # Если пациент авторизован
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, blank=True, 
        related_name='my_appointments'
    )
    
    # Если записывается гость
    guest_first_name = models.CharField(max_length=100, blank=True, null=True, verbose_name="Имя (гость)")
    guest_last_name = models.CharField(max_length=100, blank=True, null=True, verbose_name="Фамилия (гость)")
    guest_patronymic = models.CharField(max_length=100, blank=True, null=True, verbose_name="Отчество (гость)")
    guest_email = models.EmailField(blank=True, null=True, verbose_name="Email (гость)")
    guest_phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Телефон (гость)")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = self.patient.get_full_name() if self.patient else f"{self.guest_last_name} (Гость)"
        return f"{name} к {self.doctor} на {self.start_time.strftime('%d.%m %H:%M')}"

    class Meta:
        verbose_name = "Запись на прием"
        verbose_name_plural = "Записи на прием"