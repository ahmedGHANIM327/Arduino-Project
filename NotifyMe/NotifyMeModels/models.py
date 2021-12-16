from django.db import models
from django.utils import timezone

# Employee
class Employee(models.Model):
    id_badge = models.CharField(max_length=100 , null=False)
    name = models.CharField(max_length=150 , null=False)
    email = models.CharField(max_length=150 , null=False)

# Group
class Group(models.Model):
    name = models.CharField(max_length=150 , null=False)
    employees = models.ManyToManyField(Employee , related_name='employees' , blank=True ,null=True)

# Message
class Message(models.Model) :
    date_sent = models.DateTimeField(null=False , default=timezone.now())
    message_content = models.TextField(null=False)
    message_destinations = models.ManyToManyField(Employee , related_name='destinations')
    seen_by = models.ManyToManyField(Employee,related_name='employees_seen_message' , default=[] , blank=True)
    stat_message = models.CharField(max_length=1,default='R' , blank=False)
    
