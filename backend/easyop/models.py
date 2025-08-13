from django.db import models
# from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
import datetime

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
