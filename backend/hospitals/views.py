from rest_framework.generics import ListAPIView
from .models import Hospital
from .serializers import HospitalSerializer  # You need to create this serializer

class HospitalListView(ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer