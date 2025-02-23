from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import PreOperativeAssessment, RiskAssessment
from .serializers import PreOperativeAssessmentSerializer, RiskAssessmentSerializer

def index(request):
    return HttpResponse("Hello World!")

class PreOperativeAssessmentViewSet(viewsets.ModelViewSet):
    queryset = PreOperativeAssessment.objects.all()
    serializer_class = PreOperativeAssessmentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class RiskAssessmentViewSet(viewsets.ModelViewSet):
    queryset = RiskAssessment.objects.all()
    serializer_class = RiskAssessmentSerializer
    # permission_classes = [permissions.IsAuthenticated]
