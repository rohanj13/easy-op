from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from ai_engine.services import run_ai_analysis
from drf_yasg.utils import swagger_auto_schema

class generate_response_api(APIView):
    class ResponseSerializer(serializers.Serializer):
        form_id = serializers.UUIDField()
        # hospital_id = serializers.UUIDField()
        # patient_id = serializers.UUIDField()
        # medical_history = serializers.JSONField()
        # response = serializers.CharField()
        # status = serializers.CharField()

    @swagger_auto_schema(request_body=ResponseSerializer)
    def post(self, request):
        serializer = self.ResponseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ai_response = run_ai_analysis(**serializer.validated_data)
        return Response({"id": str(ai_response.id)}, status=status.HTTP_201_CREATED)