from django.db import models

# Create your models here.
class Employee(models.Model):
    id_badge = models.CharField(max_length=100 , null=False)
    name = models.TextField(null=False)
    email = models.TextField(null=False)