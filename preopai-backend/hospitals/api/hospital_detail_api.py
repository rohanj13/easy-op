from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response

from hospitals.selectors import hospital_get
from drf_yasg.utils import swagger_auto_schema

class HospitalDetailApi(APIView):
    class HospitalDetailSerializer(serializers.Serializer):
        id = serializers.UUIDField()
        name = serializers.CharField()
        
    @swagger_auto_schema()
    def get(self, request, id):
        hospital = hospital_get(id=id)
        data = self.HospitalDetailSerializer(hospital).data
        return Response(data)