from django.urls import path , include
from .  import views

urlpatterns = [
    #Employees
    path('employees/',views.allEmployees),
    path('employee/<int:id>',views.employee),
    path('addemployees/',views.addEmployees),
    path('updateemployee/<int:id>/',views.updateEmployee),
    path('deleteemployee/<int:id>/',views.delEmployee),
    path('employeeGroups/<int:id>',views.employeeGroups),
    path('addEmployeeGroups/<int:id_employee>/<int:id_group>',views.addEmployeeToGroup),
    path('removeEmployeeGroups/<int:id_employee>/<int:id_group>',views.removeEmployeeFromGroup),
    #Groups
    path('groups/',views.allGroups),
    path('group/<int:id>',views.group),
    path('addgroups/',views.addGroups),
    path('updategroup/<int:id>/',views.updateGroup),
    path('deletegroup/<int:id>/',views.delGroup),
    #messages
    path('messages/',views.allMessages),
    path('message/<int:id>',views.message),
    path('addmessages/',views.addMessages),
    path('updatemessage/<int:id>/',views.updateMessage),
    path('deletemessage/<int:id>/',views.delMessage),
]