from rest_framework import serializers
from forms.models import Form, Response

class FormSerializer(serializers.ModelSerializer):
    hospital = serializers.UUIDField(source='hospital.id', read_only=True)
    patient = serializers.UUIDField(source='patient.id', read_only=True)
    surgery = serializers.UUIDField(source='surgery.id', read_only=True)

    class Meta:
        model = Form
        fields = [
            'id', 'hospital', 'patient', 'surgery',
            'medical_history', 'response', 'status'
        ]

class ResponseSerializer(serializers.ModelSerializer):
    form = serializers.UUIDField(source='form.id')
    hospital = serializers.UUIDField(source='hospital.id')
    patient = serializers.UUIDField(source='patient.id')

    class Meta:
        model = Response
        fields = [
            'id', 'form', 'hospital', 'patient', 'ai_response_text', 'updated_response', 'status'
        ]
