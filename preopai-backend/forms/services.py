import json
from forms.models import Form
from forms.selectors import form_get
from hospitals.selectors import hospital_get
from patients.selectors import patient_get


def form_create(
    *,
    hospital_id: str,
    patient_id: str,
    medical_history
) -> Form:
    hospital = hospital_get(id=hospital_id)
    patient = patient_get(id=patient_id)
    form = Form(
        hospital=hospital,
        patient=patient,
        medical_history=medical_history
    )
    form.save()
    return form

def form_update(
   *,
    # hospital_id: str,
    # patient_id: str,
    id,
    medical_history: str,
    # response: str,
    # status: str,
) -> Form:
    form = form_get(id=id)
    if medical_history is not None:
        form.medical_history = medical_history
    # if response is not None:
    #     form.response = response
    # if status is not None:
    #     form.status = status
        
    form.save()
    return form