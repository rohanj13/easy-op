from .models import Surgery
from typing import Optional

def surgery_get(*, id: str) -> Optional[Surgery]:
    try:
        return Surgery.objects.get(id=id)
    except Surgery.DoesNotExist:
        return None

def surgery_list(*, hospital_id=None, patient_id=None):
    qs = Surgery.objects.all()
    if hospital_id:
        qs = qs.filter(hospital_id=hospital_id)
    if patient_id:
        qs = qs.filter(patient_id=patient_id)
    return qs.order_by('-created_at')
