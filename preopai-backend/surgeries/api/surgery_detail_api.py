from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from surgeries.serializers import SurgerySerializer
from surgeries.selectors import surgery_get
from drf_yasg.utils import swagger_auto_schema

class SurgeryDetailApi(APIView):
    @swagger_auto_schema(
        responses={
            200: SurgerySerializer()
        }
    )
    def get(self, request, id):
        surgery = surgery_get(id=id)
        if not surgery:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(SurgerySerializer(surgery).data)
