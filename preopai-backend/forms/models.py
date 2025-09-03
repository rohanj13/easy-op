# apps/forms/models.py
import uuid
from django.db import models
from hospitals.models import Hospital
from patients.models import Patient
from common.base_models import BaseModel

class Form(BaseModel):
    STATUS_CHOICES = [
        ("green", "Green"),
        ("yellow", "Yellow"),
        ("red", "Red"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="forms")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="forms")

    medical_history = models.JSONField()  # flexible, structured later

    response = models.TextField(blank=True, null=True)  # latest consolidated response
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="yellow")

    def __str__(self):
        return f"Form {self.id} for {self.patient}"
    
# Move to AI engine app, as this only stores upon AI endpoint running
class Response(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="responses")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="responses")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="responses")
    ai_response_text = models.TextField()
    updated_response = models.TextField()
    status = models.CharField(max_length=20, default="yellow")
    

    def __str__(self):
        return f"Response {self.id} ({self.response_type})"