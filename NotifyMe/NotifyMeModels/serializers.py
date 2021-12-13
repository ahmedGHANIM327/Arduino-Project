from rest_framework import serializers
from .models import Employee , Group

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta :
        model = Employee
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta :
        model = Group
        fields = '__all__'