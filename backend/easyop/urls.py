from django.urls import path
from .views import (
    PreOpAssessmentListCreateView, 
    PreOpAssessmentDetailView
)

urlpatterns = [
    path('/', PreOpAssessmentListCreateView.as_view(), name='preop-assessment-list-create'),
    path('/<int:pk>/', PreOpAssessmentDetailView.as_view(), name='preop-assessment-detail'),
]
