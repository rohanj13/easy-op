from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from surgeries.serializers import SurgerySerializer
from surgeries.services import surgery_create
from drf_yasg.utils import swagger_auto_schema

class SurgeryCreateApi(APIView):
    class SurgeryCreateSerializer(serializers.Serializer):
        patient_id = serializers.UUIDField()
        name = serializers.CharField()
        side = serializers.CharField()
        indication = serializers.CharField()
        scheduled_date = serializers.DateField(required=False)

    @swagger_auto_schema(request_body=SurgeryCreateSerializer, response=SurgerySerializer)
    def post(self, request):
        serializer = self.SurgeryCreateSerializer(data=request.data)
        if serializer.is_valid():
            hospital_id = request.headers.get('X-Hospital-ID')
            if not hospital_id:
                return Response(
                    {"error": "Hospital ID not provided"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            data = {**serializer.validated_data, "hospital_id": hospital_id}
            surgery = surgery_create(**data)
            return Response(SurgerySerializer(surgery).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
