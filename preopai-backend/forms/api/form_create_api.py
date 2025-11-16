from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from forms.services import form_create
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import FormSerializer
from surgeries.serializers import SurgerySerializer


class FormCreateApi(APIView):

    class FormCreateSerializer(serializers.Serializer):
        hospital_id = serializers.UUIDField()
        patient_id = serializers.UUIDField()
        surgery_id = serializers.UUIDField()
        medical_history = serializers.JSONField()

    @swagger_auto_schema(request_body=FormCreateSerializer)
    def post(self, request):
        serializer = self.FormCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        hospital_id = request.headers.get('X-Hospital-ID')
        if not hospital_id:
            return Response(
                {"error": "Hospital ID not provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {**serializer.validated_data, "hospital_id": hospital_id}
        form = form_create(**data)
        return Response(FormSerializer(form).data, status=status.HTTP_201_CREATED)
