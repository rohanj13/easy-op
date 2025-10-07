from rest_framework import serializers
from patients.models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id', 'hospital', 'first_name', 'last_name', 'dob', 'sex', 'phone', 'email'
        ]