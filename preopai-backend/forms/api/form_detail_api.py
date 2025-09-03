from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from forms.selectors import form_get
from drf_yasg.utils import swagger_auto_schema

class FormDetailApi(APIView):
    class FormDetailSerializer(serializers.Serializer):
        hospital_id = serializers.UUIDField()
        patient_id = serializers.UUIDField()
        medical_history = serializers.JSONField()
        
    @swagger_auto_schema()
    def get(self, request, id):
        form = form_get(id=id)
        data = self.FormDetailSerializer(form).data
        return Response(data)