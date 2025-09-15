from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from patients.services import patient_update
from drf_yasg.utils import swagger_auto_schema

class PatientUpdateApi(APIView):
    class PatientUpdateSerializer(serializers.Serializer):
        first_name = serializers.CharField()
        last_name = serializers.CharField()
        dob = serializers.DateField()
        sex = serializers.ChoiceField(choices=["M", "F", "O"])
        phone = serializers.CharField()
        email = serializers.EmailField()

    @swagger_auto_schema(request_body=PatientUpdateSerializer)
    def post(self, request, id):
        serializer = self.PatientUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = patient_update(id=id, **serializer.validated_data)
        return Response({"id": str(patient.id)})