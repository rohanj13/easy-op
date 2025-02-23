from rest_framework import serializers
from .models import PreOperativeAssessment, RiskAssessment

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'user_type']

class PreOperativeAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreOperativeAssessment
        fields = '__all__'

class RiskAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskAssessment
        fields = '__all__'
