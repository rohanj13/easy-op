from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from ai_engine.services import response_update
from drf_yasg.utils import swagger_auto_schema

class ResponseUpdateApi(APIView):
    class ResponseUpdateSerializer(serializers.Serializer):
        updated_response = serializers.CharField(required=False)
        status = serializers.CharField(required=False)

    @swagger_auto_schema(request_body=ResponseUpdateSerializer)
    def post(self, request, id):
        serializer = self.ResponseUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response_obj = response_update(id=id, **serializer.validated_data)
        return Response({
            "id": str(response_obj.id),
            "updated_response": response_obj.updated_response,
            "status": response_obj.status
        })