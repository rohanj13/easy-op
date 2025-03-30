from rest_framework import serializers
from .models import PreOpAssessment
from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
import inflection

class CamelCaseToSnakeCaseSerializer(serializers.ModelSerializer):
    """Serializer that automatically converts camelCase to snake_case for Django"""

    def to_internal_value(self, data):
        """Convert incoming camelCase JSON keys to snake_case"""
        new_data = {inflection.underscore(k): v for k, v in data.items()}
        return super().to_internal_value(new_data)

    def to_representation(self, instance):
        """Convert outgoing snake_case keys back to camelCase"""
        ret = super().to_representation(instance)
        return ReturnDict({inflection.camelize(k, uppercase_first_letter=False): v for k, v in ret.items()}, serializer=self)

    class Meta:
        abstract = True

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'user_type']

class PreOpAssessmentSerializer(CamelCaseToSnakeCaseSerializer):
    class Meta:
        model = PreOpAssessment
        fields = '__all__'

# class RiskAssessmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RiskAssessment
#         fields = '__all__'
