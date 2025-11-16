from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from patients.services import patient_create
from drf_yasg.utils import swagger_auto_schema
from patients.serializers import PatientSerializer

class PatientCreateApi(APIView):
    class PatientCreateSerializer(serializers.Serializer):
        first_name = serializers.CharField()
        last_name = serializers.CharField()
        dob = serializers.DateField()
        sex = serializers.ChoiceField(choices=["M", "F", "O"])
        ethnicity = serializers.CharField()
        phone = serializers.CharField()
        email = serializers.EmailField()


    @swagger_auto_schema(request_body=PatientCreateSerializer)
    def post(self, request):
        serializer = self.PatientCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        hospital_id = request.headers.get('X-Hospital-ID')
        if not hospital_id:
            return Response(
                {"error": "Hospital ID not provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {**serializer.validated_data, "hospital_id": hospital_id}
        print(hospital_id)
        patient = patient_create(**data)
        return Response(PatientSerializer(patient).data, status=status.HTTP_201_CREATED)