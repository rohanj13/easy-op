from datetime import date
from patients.models import Patient
from patients.selectors import patient_get
from hospitals.selectors import hospital_get

def patient_create(
    *,
    hospital_id: str,
    first_name: str,
    last_name: str,
    dob: date,
    sex: str,
    ethnicity: str,
    phone: str = None,
    email: str = None
) -> Patient:
    hospital = hospital_get(id=hospital_id)
    patient = Patient(
        hospital=hospital,
        first_name=first_name,
        last_name=last_name,
        dob=dob,
        sex=sex,
        ethnicity=ethnicity,
        phone=phone,
        email=email,
    )
    patient.save()
    return patient

def patient_update(
    *,
    id,
    first_name: str = None,
    last_name: str = None,
    dob = None,
    sex: str = None,
    ethnicity: str = None,
    phone: str = None,
    email: str = None
) -> Patient:
    patient = patient_get(id=id)
    if first_name is not None:
        patient.first_name = first_name
    if last_name is not None:
        patient.last_name = last_name
    if dob is not None:
        patient.dob = dob
    if sex is not None:
        patient.sex = sex
    if ethnicity is not None:
        patient.ethnicity = ethnicity
    if phone is not None:
        patient.phone = phone
    if email is not None:
        patient.email = email
    patient.save()
    return patient