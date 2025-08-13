from django.urls import path
from .views import HospitalListView

urlpatterns = [
    path('/', HospitalListView.as_view()),
]