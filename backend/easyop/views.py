from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.permissions import IsDoctorOrNurse
from users.models import CognitoUser, PatientFormAccessLog
from .models import PreOpAssessment
from .serializers import PreOpAssessmentSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema

# @extend_schema_view(
#     get=extend_schema(security=[{'BearerAuth': []}])
# )
class PreOpAssessmentListCreateView(generics.ListCreateAPIView):
    queryset = PreOpAssessment.objects.all()
    serializer_class = PreOpAssessmentSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated(), IsDoctorOrNurse()]


# @extend_schema_view(
#     get=extend_schema(security=[{'BearerAuth': []}])
# )
class PreOpAssessmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PreOpAssessment.objects.all()
    serializer_class = PreOpAssessmentSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrNurse]

    def log_access(self, request, action):
        accessor = request.user
        patient_form = self.get_object()
        PatientFormAccessLog.objects.create(
            accessor=accessor,
            patient_form=patient_form,
            action=action
        )

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        self.log_access(request, 'viewed')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        self.log_access(request, 'edited')
        return response

    def destroy(self, request, *args, **kwargs):
        self.log_access(request, 'deleted')
        return super().destroy(request, *args, **kwargs)