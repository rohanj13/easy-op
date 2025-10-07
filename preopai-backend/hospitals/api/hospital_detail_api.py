from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response

from hospitals.selectors import hospital_get
from drf_yasg.utils import swagger_auto_schema
from hospitals.serializers import HospitalSerializer

class HospitalDetailApi(APIView):
    class HospitalDetailSerializer(serializers.Serializer):
        id = serializers.UUIDField()
        name = serializers.CharField()
        
    @swagger_auto_schema(response=HospitalSerializer)
    def get(self, request, id):
        hospital = hospital_get(id=id)
        data = self.HospitalDetailSerializer(hospital).data
        return Response(HospitalSerializer(hospital).data)