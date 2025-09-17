from forms.models import Form, Response
from forms.selectors import form_get
from ai_engine.selectors import response_get
from rag_pipeline import run_rag_pipeline

# def get_ai_response(medical_history):
#     return "AI Response"

def parse_status(response):
    return "Yellow"

def run_ai_analysis(
        *,
        form_id: str,
        # hospital_id: str,
        # patient_id: str,
) -> Response:
    
    form = form_get(id=form_id)
    # hospital = hospital_get(id=form.hospital.id)
    # patient = patient_get(id=form.patient.id)

    response_text = run_rag_pipeline(form.medical_history)
    status = parse_status(response_text)
    # Create new response object
    response = Response(
        form=form,
        hospital=form.hospital,
        patient=form.patient,
        ai_response_text=response_text,
        updated_response=response_text,
        status=status
    )

    # Update the form response and status field
    retrieve_form = Form.objects.get(id=form.id)
    retrieve_form.response = response_text
    retrieve_form.status = status
    # Save to DB
    retrieve_form.save()
    response.save()
    # Return Response Object
    return response

def response_update(
    *,
    id,
    updated_response: str = None,
    status: str = None,
) -> Response:
    response_obj = response_get(id=id)
    form = response_obj.form

    # Update response text if provided
    if updated_response is not None:
        response_obj.updated_response = updated_response
        form.response = updated_response

    # Update status if provided
    if status is not None:
        response_obj.status = status
        form.status = status

    response_obj.save()
    form.save()
    return response_obj