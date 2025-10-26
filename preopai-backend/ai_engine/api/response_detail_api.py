from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from ai_engine.selectors import response_get
from drf_yasg.utils import swagger_auto_schema

class ResponseDetailApi(APIView):
    class ResponseDetailSerializer(serializers.Serializer):
        form_id = serializers.UUIDField()
        hospital_id = serializers.UUIDField()
        patient_id = serializers.UUIDField()
        ai_response_text = serializers.CharField()
        updated_response = serializers.CharField()
        status = serializers.CharField()
        
    @swagger_auto_schema()
    def get(self, request, id):
        response = response_get(id=id)
        data = self.ResponseDetailSerializer(response).data
        return Response(data)