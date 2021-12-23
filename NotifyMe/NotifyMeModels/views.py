from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EmployeeSerializer , GroupSerializer, MessageSerializer
from .models import Employee , Group , Message
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

#Add an employee to a group
@api_view(['GET'])
def addEmployeeToGroup(request,id_employee , id_group):
    group = Group.objects.get(id=id_group)
    group.employees.add(Employee.objects.get(id=id_employee))
    group.save()
    return Response("Employee added to group")

#Remove an employee from a group
@api_view(['GET'])
def removeEmployeeFromGroup(request,id_employee , id_group):
    group = Group.objects.get(id=id_group)
    group.employees.remove(Employee.objects.get(id=id_employee))
    group.save()
    return Response("Employee "+str(id_employee)+" removed from group "+str(id_group))

# View messages not yet seen
#Function used when badge detected
@api_view(['GET'])
def viewMessagesByEmployee(request , id_employee):
    # Get messages not yet seen by this employee 
    messages = Message.objects.filter(message_destinations=id_employee)
    messages = messages.exclude(seen_by = id_employee)
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    for message in messages :
        message.seen_by.add(Employee.objects.get(id=id_employee))
        checkStatut(message.id)
    return Response(serialization.data)

#View messages sent to employee ( seen and not yet seen )
#Function used by admin
@api_view(['GET'])
def employeeAllMessages(request , id_employee):
    # Get all messages sent to this employee 
    messages = Message.objects.filter(message_destinations=id_employee)

    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    return Response(serialization.data)

#View messages seen by employee 
#Function used by admin
@api_view(['GET'])
def messagesSeenByEmployee(request , id_employee):
    # Get all messages seen by employee 
    messages = Message.objects.filter(seen_by=id_employee)
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    return Response(serialization.data)

#View messages not yet seen by employee 
#Function used by admin
@api_view(['GET'])
def messagesNotSeenByEmployee(request , id_employee):
    # Get all messages not seen by employee 
    messages = Message.objects.filter(message_destinations=id_employee)
    messages = messages.exclude(seen_by = id_employee)
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
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

################################## Message #################################
# Get all messages
@api_view(['GET'])
def allMessages(request):
    # Get all objects
    messages= Message.objects.all()
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    return Response(serialization.data)

#Get Message by ID
@api_view(['GET'])
def message(request , id):
    # Get all objects
    message = Message.objects.get(id=id)
    #serialize this object
    serialization = MessageSerializer(message)
    return Response(serialization.data)

#Add new message
@api_view(['POST'])
def addMessages(request):
    serializer = MessageSerializer(data= request.data , many = True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#Update a message
@api_view(['PUT'])
def updateMessage(request,id):
    message = Message.objects.get(id=id)
    serializer = MessageSerializer(instance = message , data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#del a message
@api_view(['DELETE'])
def delMessage(request,id):
    message = Message.objects.get(id=id)
    message.delete()
    return Response("message deleted")

#View messages not yet seen by all destination 
@api_view(['GET'])
def messagesNotSeen(request):
    # Get all messages not seen by all 
    messages = Message.objects.filter(stat_message='R')
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    return Response(serialization.data)

#View messages seen by all destination 
@api_view(['GET'])
def messagesSeen(request):
    # Get all messages not seen by all 
    messages = Message.objects.filter(stat_message='V')
    #serialize this object
    serialization = MessageSerializer(messages , many=True)
    return Response(serialization.data)

#check message statut ( if all destinations have seen the message)
def checkStatut(id):
    message = Message.objects.get(id=id)
    if message.seen_by.count() == message.message_destinations.count() :
        message.stat_message = 'V'
        message.save()