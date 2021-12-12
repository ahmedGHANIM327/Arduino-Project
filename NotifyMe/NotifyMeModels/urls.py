from django.urls import path , include
from .  import views

urlpatterns = [
    path('employees/',views.allEmployees),
    path('employee/<int:id>',views.employee),
    path('addemployees/',views.addEmployees),
    path('updateemployee/<int:id>/',views.updateEmployee),
    path('deleteemployee/<int:id>/',views.delEmployee),
]