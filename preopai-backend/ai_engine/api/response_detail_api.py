from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import ResponseSerializer
from ai_engine.selectors import response_get

class ResponseDetailApi(APIView):
    @swagger_auto_schema(
        responses={
            200: ResponseSerializer()
        }
    )
    def get(self, request, id):
        response_obj = response_get(id=id)
        return Response(ResponseSerializer(response_obj).data)