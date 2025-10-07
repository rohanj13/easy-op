from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from forms.selectors import form_get
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import FormSerializer

class FormDetailApi(APIView):
    class FormDetailSerializer(serializers.Serializer):
        hospital_id = serializers.UUIDField()
        patient_id = serializers.UUIDField()
        medical_history = serializers.JSONField()
        response = serializers.CharField()
        status = serializers.CharField()
        
    @swagger_auto_schema(responses={200: FormSerializer})
    def get(self, request, id):
        form = form_get(id=id)
        data = self.FormDetailSerializer(form).data
        return Response(FormSerializer(form).data)