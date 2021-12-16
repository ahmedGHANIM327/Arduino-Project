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
    #Groups
    path('groups/',views.allGroups),
    path('group/<int:id>',views.group),
    path('addgroups/',views.addGroups),
    path('updategroup/<int:id>/',views.updateGroup),
    path('deletegroup/<int:id>/',views.delGroup),
]