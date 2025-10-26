from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from patients.selectors import patient_list
from drf_yasg.utils import swagger_auto_schema
from patients.serializers import PatientSerializer

class PatientListApi(APIView):
    # class PatientListSerializer(serializers.Serializer):
    #     first_name = serializers.CharField()
    #     last_name = serializers.CharField()
    #     dob = serializers.DateField()
    #     sex = serializers.ChoiceField(choices=["M", "F", "O"])
    #     ethnicity = serializers.CharField()
    #     phone = serializers.CharField()
    #     email = serializers.EmailField()
    #     hospital_id = serializers.UUIDField()

    @swagger_auto_schema()
    def get(self, request):
        patients = patient_list()
        # data = self.PatientListSerializer(patients, many=True).data
        return Response(PatientSerializer(patients, many=True).data)
