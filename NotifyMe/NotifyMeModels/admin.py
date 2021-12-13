from django.contrib import admin

# Register your models here.
from .models import Employee , Group

# Register your models here.
admin.site.register(Employee)
admin.site.register(Group)