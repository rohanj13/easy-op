from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from forms.services import form_create
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import FormSerializer


class FormCreateApi(APIView):
    class FormCreateSerializer(serializers.Serializer):
        hospital_id = serializers.UUIDField()
        patient_id = serializers.UUIDField()
        medical_history = serializers.JSONField()
        # response = serializers.CharField()
        # status = serializers.CharField()

    @swagger_auto_schema(request_body=FormCreateSerializer, responses={200: FormSerializer})
    def post(self, request):
        serializer = self.FormCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        form = form_create(**serializer.validated_data)
        return Response(FormSerializer(form).data, status=status.HTTP_201_CREATED)