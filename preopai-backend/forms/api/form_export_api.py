from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from forms.services import export_form_pdf
from drf_yasg.utils import swagger_auto_schema

class FormExportApi(APIView):
    # @swagger_auto_schema(request_body=
    def get(self, request, id):
        pdf_bytes = export_form_pdf(id=id)
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="form_{id}.pdf"'
        return response