from django.db import models

# Employee
class Employee(models.Model):
    id_badge = models.CharField(max_length=100 , null=False)
    name = models.CharField(max_length=150 , null=False)
    email = models.CharField(max_length=150 , null=False)

# Group
class Group(models.Model):
    name = models.CharField(max_length=150 , null=False)
    employees = models.ManyToManyField(Employee , related_name='employees')
