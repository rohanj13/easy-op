from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from patients.services import patient_update
from drf_yasg.utils import swagger_auto_schema
from patients.serializers import PatientSerializer

class PatientUpdateApi(APIView):
    class PatientUpdateSerializer(serializers.Serializer):
        first_name = serializers.CharField(required=False)
        last_name = serializers.CharField(required=False)
        dob = serializers.DateField(required=False)
        sex = serializers.ChoiceField(choices=["M", "F", "O"], required=False)
        phone = serializers.CharField(required=False)
        email = serializers.EmailField(required=False)

    @swagger_auto_schema(request_body=PatientUpdateSerializer, response=PatientSerializer)
    def post(self, request, id):
        serializer = self.PatientUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = patient_update(id=id, **serializer.validated_data)
        return Response(PatientSerializer(patient).data)