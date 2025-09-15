from typing import Iterable
from patients.models import Patient

def patient_list() -> Iterable[Patient]:
    """
    Selector to return all patients.
    """
    return Patient.objects.all()

def patient_get(*, id) -> Patient:
    """
    Selector to return a single patient by ID.
    """
    return Patient.objects.get(id=id)