from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Администратор'
        DOCTOR = 'DOCTOR', 'Врач'
        PATIENT = 'PATIENT', 'Пациент'
        STAFF = 'STAFF', 'Медперсонал'

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.PATIENT)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.get_full_name()} ({self.get_role_display()})"
