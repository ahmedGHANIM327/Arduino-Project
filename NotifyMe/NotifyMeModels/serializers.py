from rest_framework import serializers
from .models import Employee , Group , Message

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta :
        model = Employee
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta :
        model = Group
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta :
        model = Message
        fields = '__all__'