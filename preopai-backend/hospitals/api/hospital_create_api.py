from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from hospitals.services import hospital_create
from drf_yasg.utils import swagger_auto_schema

class HospitalCreateApi(APIView):
    class HospitalCreateSerializer(serializers.Serializer):
        # id = serializers.UUIDField()
        name = serializers.CharField()
    @swagger_auto_schema(request_body=HospitalCreateSerializer)
    def post(self, request):
        serializer = self.HospitalCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hospital_create(**serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)