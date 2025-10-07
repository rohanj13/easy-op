from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from patients.selectors import patient_get
from drf_yasg.utils import swagger_auto_schema
from patients.serializers import PatientSerializer

class PatientDetailApi(APIView):
    class PatientDetailSerializer(serializers.Serializer):
        first_name = serializers.CharField()
        last_name = serializers.CharField()
        dob = serializers.DateField()
        sex = serializers.ChoiceField(choices=["M", "F", "O"])
        phone = serializers.CharField()
        email = serializers.EmailField()
        hospital_id = serializers.UUIDField()

    @swagger_auto_schema(
        responses={
            200: PatientSerializer()
        }
    )
    def get(self, request, id):
        patient = patient_get(id=id)
        # data = self.PatientDetailSerializer(patient).data
        return Response(PatientSerializer(patient).data)