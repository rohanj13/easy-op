import datetime
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.

class AssessmentCardiac(models.Model):
    # Model to store the assessment data for cardiac patients
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    patient_id = models.CharField(max_length=255, unique=True)
    colour = models.CharField(max_length=50, blank=True, null=True)
    outcomes = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    rcri_score = models.IntegerField(blank=True, null=True)
    dasi_score = models.IntegerField(blank=True, null=True)
    active_cardiac_conditions = ArrayField(models.CharField(max_length=255), blank=True, null=True)

# Model contains:
# Colour
# Outcomes (Recommendations)
# RCRI Score
# DASI Score
# Active Cardiac Conditions
