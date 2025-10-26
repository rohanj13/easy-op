from .models import Surgery
from hospitals.models import Hospital
from patients.models import Patient
from typing import Optional

def surgery_create(*, hospital_id, patient_id, name, indication, side=None, scheduled_date=None) -> Surgery:
    hospital = Hospital.objects.get(id=hospital_id)
    patient = Patient.objects.get(id=patient_id)
    surgery = Surgery.objects.create(
        hospital=hospital,
        patient=patient,
        name=name,
        indication=indication,
        side=side,
        scheduled_date=scheduled_date
    )
    return surgery

def surgery_update(*, id, **kwargs) -> Optional[Surgery]:
    try:
        surgery = Surgery.objects.get(id=id)
        for attr, value in kwargs.items():
            setattr(surgery, attr, value)
        surgery.save()
        return surgery
    except Surgery.DoesNotExist:
        return None

def surgery_delete(*, id) -> bool:
    try:
        surgery = Surgery.objects.get(id=id)
        surgery.delete()
        return True
    except Surgery.DoesNotExist:
        return False
