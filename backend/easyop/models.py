from django.db import models
# from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
import datetime

"""
To be added later on
"""
# class Patient(models.Model):
#     # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient")
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     date_of_birth = models.DateField()
#     contact_number = models.CharField(max_length=15, blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"

"""
To be added later on
"""
# class Doctor(models.Model):
#     # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="doctor")
#     full_name = models.CharField(max_length=200)
#     specialization = models.CharField(max_length=200)
#     contact_number = models.CharField(max_length=15, blank=True, null=True)
#     licence_number = models.IntegerField(max_length=10)

#     def __str__(self):
#         return self.full_name


# class PreOpAssessment(models.Model):
#     patient_name = models.CharField(max_length=255)
#     age = models.IntegerField()
#     weight = models.FloatField()
#     height = models.FloatField()
#     existing_conditions = models.TextField(blank=True, null=True)
#     medications = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Assessment {self.id} - {self.patient_name}"

"""
Add risk assessment object potentially? or just have them as attributes of the form. Will have to decide as there may be many risk assessments.
"""

# class RiskAssessment(models.Model):
#     assessment = models.ForeignKey(PreOpAssessment, on_delete=models.CASCADE)
#     risk_score = models.FloatField()
#     recommendation = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Risk Assessment for {self.assessment.patient.user.username} - Score: {self.risk_score}"

import datetime
from django.contrib.postgres.fields import ArrayField
from django.db import models

class PreOpAssessment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Patient Details
    gender = models.CharField(max_length=10, null=True, blank=True)  # Allowing it to be nullable
    date_of_birth = models.DateField(blank=True, auto_now_add=True)

    # Operation Details
    surgeon = models.CharField(max_length=100, null=True, blank=True)
    hospital = models.CharField(max_length=100, null=True, blank=True)
    operation = models.CharField(max_length=200, null=True, blank=True)
    date_of_operation = models.DateField(auto_now_add=True)
    operation_reason = models.TextField(null=True, blank=True)

    # Patient Medical Details
    height = models.FloatField(help_text="Height in cm", null=True, blank=True)
    weight = models.FloatField(help_text="Weight in kg", null=True, blank=True)
    recently_unwell = models.TextField(blank=True, default="")
    previous_anaesthetic = models.TextField(blank=True, default="")
    family_anaesthetic_reaction = models.TextField(blank=True, default="")
    allergies = models.TextField(blank=True, default="")
    regular_medications = models.TextField(blank=True, default="")
    smoke_or_vape = models.CharField(max_length=10, null=True, blank=True)  # Allow null
    alcohol_consumption = models.TextField(blank=True, default="")

    # Medical Conditions
    heart_issues = models.TextField(blank=True, default="")
    shortness_of_breath = models.TextField(blank=True, default="")
    lung_issues = models.TextField(blank=True, default="")
    diabetes = models.TextField(blank=True, default="")
    gastrointestinal_issues = models.TextField(blank=True, default="")
    thyroid_disease = models.TextField(blank=True, default="")
    neurological_condition = models.TextField(blank=True, default="")
    rheumatoid_arthritis = models.TextField(blank=True, default="")
    kidney_condition = models.TextField(blank=True, default="")
    blood_clotting = models.TextField(blank=True, default="")
    cancer = models.TextField(blank=True, default="")

    # Other Health Information
    covid_history = models.TextField(blank=True, default="")

    # Array fields (using PostgreSQL ArrayField)
    dental_descriptions = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    effective_pain_relievers = ArrayField(models.CharField(max_length=200), blank=True, default=list)
    pain_relievers_to_avoid = ArrayField(models.CharField(max_length=200), blank=True, default=list)

    other_medical_conditions = models.TextField(blank=True, default="")

    def __str__(self):
        return f"Assessment - {self.operation} on {self.date_of_operation}"
