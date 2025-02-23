from django.urls import path
from .views import (
    PreOpAssessmentListCreateView, 
    PreOpAssessmentDetailView, 
    RunRiskAssessmentView
)

urlpatterns = [
    path('preop-assessments/', PreOpAssessmentListCreateView.as_view(), name='preop-assessment-list-create'),
    path('preop-assessments/<int:pk>/', PreOpAssessmentDetailView.as_view(), name='preop-assessment-detail'),
    path('risk-assessments/<int:pk>/', RunRiskAssessmentView.as_view(), name='run-risk-assessment'),
]
