from django.db import models
# from django.contrib.auth.models import User

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


class PreOpAssessment(models.Model):
    patient_name = models.CharField(max_length=255)
    age = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()
    existing_conditions = models.TextField(blank=True, null=True)
    medications = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Assessment {self.id} - {self.patient_name}"

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
