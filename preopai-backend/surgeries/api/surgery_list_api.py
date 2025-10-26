from rest_framework.views import APIView
from rest_framework.response import Response
from surgeries.serializers import SurgerySerializer
from surgeries.selectors import surgery_list
from drf_yasg.utils import swagger_auto_schema

class SurgeryListApi(APIView):
    @swagger_auto_schema(
        responses={
            200: SurgerySerializer(many=True)
        }
    )
    def get(self, request):
        hospital_id = request.query_params.get('hospital_id')
        patient_id = request.query_params.get('patient_id')
        surgeries = surgery_list(hospital_id=hospital_id, patient_id=patient_id)
        return Response(SurgerySerializer(surgeries, many=True).data)
