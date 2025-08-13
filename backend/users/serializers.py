# users/serializers.py
from rest_framework import serializers

class CurrentUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()