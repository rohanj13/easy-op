from typing import Iterable
from hospitals.models import Hospital

def hospital_list() -> Iterable[Hospital]:
    """
    Selector to return all hospitals.
    """
    return Hospital.objects.all()

def hospital_get(id) -> Hospital:
    """
    Selector to return a single hospital by ID.
    """
    return Hospital.objects.get(id=id)