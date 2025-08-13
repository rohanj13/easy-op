from django.db import models

# Create your models here.
from django.db import models
from users.models import CognitoUser

class Hospital(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class DoctorProfile(models.Model):
    user = models.OneToOneField(CognitoUser, on_delete=models.CASCADE, related_name='doctor_profile')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=100, unique=True)
    is_verified = models.BooleanField(default=False)

class NurseProfile(models.Model):
    user = models.OneToOneField(CognitoUser, on_delete=models.CASCADE, related_name='nurse_profile')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)