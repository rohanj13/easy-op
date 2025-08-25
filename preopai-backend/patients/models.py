import uuid
from django.db import models
from hospitals.models import Hospital
from common.base_models import BaseModel

class Patient(BaseModel):
    SEX_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="patients")

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"