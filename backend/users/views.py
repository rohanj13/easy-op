from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema

from drf_spectacular.utils import extend_schema, OpenApiTypes

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    # @extend_schema(
    #     responses=OpenApiTypes.OBJECT,
    #     security=[{'BearerAuth': []}]
    # )
    def get(self, request):
        user = request.user
        return Response({
            "email": user.email,
            "role": user.role,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })