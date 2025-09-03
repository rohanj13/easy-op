from hospitals.models import Hospital
from hospitals.selectors import hospital_get

def hospital_create(
    *,
    # id: str,
    name: str
) -> Hospital:
    hospital = Hospital(name = name)
    # hospital.full_clean()
    hospital.save()

    return hospital

def hospital_update(
        *,
        id: str,
        name: str
) -> Hospital:
    hospital = hospital_get(id=id)
    hospital.name = name
    hospital.save()
    return hospital