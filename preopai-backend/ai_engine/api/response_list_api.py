from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import ResponseSerializer
from ai_engine.selectors import response_list

class ResponseListApi(APIView):
    @swagger_auto_schema(
        responses={
            200: ResponseSerializer(many=True)
        }
    )
    def get(self, request):
        responses = response_list()
        return Response(ResponseSerializer(responses, many=True).data)