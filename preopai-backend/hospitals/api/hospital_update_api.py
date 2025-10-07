from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from hospitals.services import hospital_update
from drf_yasg.utils import swagger_auto_schema
from hospitals.serializers import HospitalSerializer

class HospitalUpdateApi(APIView):
    class HospitalUpdateSerializer(serializers.Serializer):
        # id = serializers.UUIDField()
        name = serializers.CharField()
        
    @swagger_auto_schema(request_body=HospitalUpdateSerializer, response=HospitalSerializer)
    def post(self, request, id):
        serializer = self.HospitalUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hospital = hospital_update(id=id, **serializer.validated_data)

        return Response(HospitalSerializer(hospital).data, status=status.HTTP_200_OK)