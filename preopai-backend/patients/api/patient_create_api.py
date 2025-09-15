from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from patients.services import patient_create
from drf_yasg.utils import swagger_auto_schema

class PatientCreateApi(APIView):
    class PatientCreateSerializer(serializers.Serializer):
        first_name = serializers.CharField()
        last_name = serializers.CharField()
        dob = serializers.DateField()
        sex = serializers.ChoiceField(choices=["M", "F", "O"])
        phone = serializers.CharField()
        email = serializers.EmailField()
        hospital_id = serializers.UUIDField()


    @swagger_auto_schema(request_body=PatientCreateSerializer)
    def post(self, request):
        serializer = self.PatientCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        patient = patient_create(**serializer.validated_data)
        return Response({"id": str(patient.id)}, status=status.HTTP_201_CREATED)