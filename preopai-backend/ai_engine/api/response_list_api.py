from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from ai_engine.selectors import response_list
from drf_yasg.utils import swagger_auto_schema

class ResponseListApi(APIView):
    class ResponseListSerializer(serializers.Serializer):
        id = serializers.UUIDField()
       
    @swagger_auto_schema()
    def get(self, request):
        responses = response_list()
        data = self.ResponseListSerializer(responses, many=True).data
        return Response(data)