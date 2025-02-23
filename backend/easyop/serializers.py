from rest_framework import serializers
from .models import PreOpAssessment

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'user_type']

class PreOpAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreOpAssessment
        fields = '__all__'

# class RiskAssessmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RiskAssessment
#         fields = '__all__'
