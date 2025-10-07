from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from forms.services import form_update
from drf_yasg.utils import swagger_auto_schema
from forms.serializers import FormSerializer

class FormUpdateApi(APIView):
    class InputSerializer(serializers.Serializer):
        medical_history = serializers.JSONField()

    @swagger_auto_schema(request_body=InputSerializer, responses={201: FormSerializer})
    def post(self, request, id):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        form = form_update(id=id, **serializer.validated_data)
        return Response(FormSerializer(form).data)