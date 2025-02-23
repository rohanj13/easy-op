from django.db import models

# Create your models here.

from django.db import models
# from django.contrib.auth.models import User

class Patient(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Doctor(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="doctor")
    full_name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    licence_number = models.IntegerField(max_length=10)

    def __str__(self):
        return self.full_name


class PreOperativeAssessment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="pre-op form")
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    # Example fields (add more as needed)
    height = models.FloatField(help_text="Height in cm")
    weight = models.FloatField(help_text="Weight in kg")
    allergies = models.TextField(blank=True, null=True)
    existing_conditions = models.TextField(blank=True, null=True)
    medications = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Assessment for {self.patient.user.username} on {self.submitted_at}"


class RiskAssessment(models.Model):
    assessment = models.ForeignKey(PreOperativeAssessment, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)
    risk_score = models.FloatField()
    recommendation = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Risk Assessment for {self.assessment.patient.user.username} - Score: {self.risk_score}"
