from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PreOpAssessment
from .serializers import PreOpAssessmentSerializer
from .services import calculate_risk_score

# List & Create Pre-Op Assessments
class PreOpAssessmentListCreateView(generics.ListCreateAPIView):
    queryset = PreOpAssessment.objects.all()
    serializer_class = PreOpAssessmentSerializer

# Retrieve, Update & Delete a Single Assessment
class PreOpAssessmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PreOpAssessment.objects.all()
    serializer_class = PreOpAssessmentSerializer

# Run Risk Assessment for a Given Assessment ID
class RunRiskAssessmentView(APIView):
    def get(self, request, pk):
        try:
            assessment = PreOpAssessment.objects.get(pk=pk)
            risk_score = calculate_risk_score(assessment)
            return Response({"assessment_id": pk, "risk_score": risk_score}, status=status.HTTP_200_OK)
        except PreOpAssessment.DoesNotExist:
            return Response({"error": "Assessment not found"}, status=status.HTTP_404_NOT_FOUND)
