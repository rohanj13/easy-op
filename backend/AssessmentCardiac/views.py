from django.shortcuts import render

# Create your views here.
# Define function that is called by the URL
# Function calls the service to calculate cardiac risk
# Returns the cardiac risk score model

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .services import cardiac_risk_assessment
from .models import CardiacAssessmentResult
import json

@csrf_exempt
@api_view(['POST'])
def calculate_cardiac_risk(request):
    """
    API to calculate the cardiac risk assessment.
    Expects a JSON payload with the assessment data.
    """
    if request.method == "POST":
        try:
            # Parse the assessment data from the request body
            data = json.loads(request.body)
            patient_id = data.get("patient_id")
            pre_op_assessment_id = data.get("pre_op_assessment_id")

            # Check if the result already exists
            existing_result = CardiacAssessmentResult.objects.filter(
                patient_id=patient_id, pre_op_assessment_id=pre_op_assessment_id
            ).first()
            if existing_result:
                return JsonResponse({
                    "message": "Cardiac risk assessment already calculated.",
                    "data": {
                        "colour": existing_result.colour,
                        "outcomes": existing_result.outcomes,
                        "rcri_score": existing_result.rcri_score,
                        "dasi_score": existing_result.dasi_score,
                        "active_cardiac_conditions": existing_result.active_cardiac_conditions,
                    }
                }, status=200)

            # Perform the cardiac risk assessment
            result = cardiac_risk_assessment(data)

            # Save the result to the database
            cardiac_result = CardiacAssessmentResult.objects.create(
                patient_id=patient_id,
                pre_op_assessment_id=pre_op_assessment_id,
                colour=result.colour,
                outcomes=result.outcomes,
                rcri_score=result.rcri_score,
                dasi_score=result.dasi_score,
                active_cardiac_conditions=result.active_cardiac_conditions,
            )

            # Return the result
            return JsonResponse({
                "message": "Cardiac risk assessment calculated successfully.",
                "data": {
                    "colour": cardiac_result.colour,
                    "outcomes": cardiac_result.outcomes,
                    "rcri_score": cardiac_result.rcri_score,
                    "dasi_score": cardiac_result.dasi_score,
                    "active_cardiac_conditions": cardiac_result.active_cardiac_conditions,
                }
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)


def get_cardiac_risk(request, patient_id, pre_op_assessment_id):
    """
    API to fetch the cardiac risk assessment result if it has already been calculated.
    """
    if request.method == "GET":
        try:
            # Fetch the result from the database
            cardiac_result = get_object_or_404(
                CardiacAssessmentResult,
                patient_id=patient_id,
                pre_op_assessment_id=pre_op_assessment_id,
            )

            # Return the result
            return JsonResponse({
                "message": "Cardiac risk assessment fetched successfully.",
                "data": {
                    "colour": cardiac_result.colour,
                    "outcomes": cardiac_result.outcomes,
                    "rcri_score": cardiac_result.rcri_score,
                    "dasi_score": cardiac_result.dasi_score,
                    "active_cardiac_conditions": cardiac_result.active_cardiac_conditions,
                }
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)