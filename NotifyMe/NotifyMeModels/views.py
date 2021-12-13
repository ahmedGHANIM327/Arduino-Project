from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EmployeeSerializer , GroupSerializer
from .models import Employee , Group
# Create your views here.


# Employee Model management
@api_view(['GET'])
def allEmployees(request):
    # Get all objects
    employees = Employee.objects.all()
    #serialize this object
    serialization = EmployeeSerializer(employees , many=True)
    return Response(serialization.data)


#Get employee by id
@api_view(['GET'])
def employee(request , id):
    # Get all objects
    employee = Employee.objects.get(id=id)

    #serialize this object
    serialization = EmployeeSerializer(employee)
    return Response(serialization.data)


#Add new employee
@api_view(['POST'])
def addEmployees(request):
    serializer = EmployeeSerializer(data= request.data , many = True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#Update a employee
@api_view(['PUT'])
def updateEmployee(request,id):
    employee = Employee.objects.get(id=id)
    serializer = EmployeeSerializer(instance = employee , data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#Update a employee
@api_view(['DELETE'])
def delEmployee(request,id):
    employee = Employee.objects.get(id=id)
    employee.delete()
    return Response("employee deleted")

# Group Model management
@api_view(['GET'])
def allGroups(request):
    # Get all objects
    groups= Group.objects.all()
    #serialize this object
    serialization = GroupSerializer(groups , many=True)
    return Response(serialization.data)