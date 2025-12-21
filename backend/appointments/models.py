from django.db import models
from django.conf import settings

class DoctorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=255, verbose_name="Специализация")
    bio = models.TextField(blank=True, verbose_name="О враче")

    def __str__(self):
        return f"Д-р {self.user.last_name}"

class Slot(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='slots')
    start_time = models.DateTimeField(verbose_name="Начало приема")
    end_time = models.DateTimeField(verbose_name="Конец приема")
    is_booked = models.BooleanField(default=False, verbose_name="Занято")

    def __str__(self):
        return f"{self.doctor} - {self.start_time.strftime('%d.%m %H:%M')}"

class Appointment(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)
    
    # Если пациент авторизован
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, blank=True, 
        related_name='my_appointments'
    )
    
    # Если записывается гость
    guest_first_name = models.CharField(max_length=100, blank=True, null=True)
    guest_last_name = models.CharField(max_length=100, blank=True, null=True)
    guest_patronymic = models.CharField(max_length=100, blank=True, null=True)
    guest_email = models.EmailField(blank=True, null=True)
    guest_phone = models.CharField(max_length=20, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = self.patient.get_full_name() if self.patient else self.guest_last_name
        return f"Запись: {name} к {self.doctor}"
    
class Service(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=50) # Или DecimalField
    description = models.TextField()

    def __str__(self):
        return self.name