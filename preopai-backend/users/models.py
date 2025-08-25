import uuid
from django.db import models
from hospitals.models import Hospital
from common.base_models import BaseModel

class Staff(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="users")
    auth_sub = models.CharField(max_length=255, unique=True)  # External auth provider ID
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.email})"