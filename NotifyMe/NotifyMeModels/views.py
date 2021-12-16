from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EmployeeSerializer , GroupSerializer
from .models import Employee , Group
# Create your views here.


############################### Employee ###########################

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

# Get Groups of an Employee
@api_view(['GET'])
def employeeGroups(request , id):
    # Get all groups that contains this employee 
    groups= Group.objects.filter(employees=id)
    #serialize this object
    serialization = GroupSerializer(groups , many=True)
    return Response(serialization.data)

############################### Group ###########################

# Group Model management
@api_view(['GET'])
def allGroups(request):
    # Get all objects
    groups= Group.objects.all()
    #serialize this object
    serialization = GroupSerializer(groups , many=True)
    return Response(serialization.data)

#Get Group by ID
@api_view(['GET'])
def group(request , id):
    # Get all objects
    group = Group.objects.get(id=id)
    #serialize this object
    serialization = GroupSerializer(group)
    return Response(serialization.data)


#Add new group
@api_view(['POST'])
def addGroups(request):
    serializer = GroupSerializer(data= request.data , many = True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#Update a group
@api_view(['PUT'])
def updateGroup(request,id):
    group = Group.objects.get(id=id)
    serializer = GroupSerializer(instance = group , data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#del a group
@api_view(['DELETE'])
def delGroup(request,id):
    group = Group.objects.get(id=id)
    group.delete()
    return Response("group deleted")

