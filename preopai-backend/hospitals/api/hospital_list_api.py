from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response

from hospitals.selectors import hospital_list
from drf_yasg.utils import swagger_auto_schema
from hospitals.serializers import HospitalSerializer

class HospitalListApi(APIView):
    class HospitalListSerializer(serializers.Serializer):
        id = serializers.UUIDField()
        name = serializers.CharField()
        
    @swagger_auto_schema(response=HospitalSerializer)
    def get(self, request):
        hospitals = hospital_list()
        data = self.HospitalListSerializer(hospitals, many=True).data
        return Response(HospitalSerializer(hospitals, many=True).data)