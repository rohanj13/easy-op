from rest_framework import serializers
from .models import Surgery

class SurgerySerializer(serializers.ModelSerializer):
    hospital = serializers.UUIDField(source='hospital.id')
    patient = serializers.UUIDField(source='patient.id')

    class Meta:
        model = Surgery
        fields = [
            'id', 'hospital', 'patient', 'name', 'side', 'indication', 'scheduled_date'
        ]
