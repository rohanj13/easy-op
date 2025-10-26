from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from surgeries.serializers import SurgerySerializer
from surgeries.services import surgery_update
from drf_yasg.utils import swagger_auto_schema

class SurgeryUpdateApi(APIView):

    class SurgeryUpdateSerializer(serializers.Serializer):
        name = serializers.CharField()
        side = serializers.CharField()
        indication = serializers.CharField()
        scheduled_date = serializers.DateField()

    @swagger_auto_schema(request_body=SurgeryUpdateSerializer, response=SurgerySerializer)
    def put(self, request, id):
        serializer = self.SurgeryUpdateSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            surgery = surgery_update(id=id, **serializer.validated_data)
            if not surgery:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            return Response(SurgerySerializer(surgery).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

