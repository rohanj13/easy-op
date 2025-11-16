import uuid
from django.db import models
from hospitals.models import Hospital
from patients.models import Patient
from common.base_models import BaseModel

class Surgery(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="surgeries")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="surgeries")
    name = models.TextField()
    side = models.TextField(blank=True, null=True)
    indication = models.TextField()
    scheduled_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Surgery {self.id}"
