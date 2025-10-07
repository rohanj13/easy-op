from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from forms.selectors import form_list
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import FormSerializer

class FormListApi(APIView):
    class FormListSerializer(serializers.Serializer):
        id = serializers.UUIDField()
       
    @swagger_auto_schema(responses={200: FormSerializer(many=True)})
    def get(self, request):
        forms = form_list()
        data = self.FormListSerializer(forms, many=True).data
        return Response(FormSerializer(forms, many=True).data)