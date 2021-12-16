from django.contrib import admin

# Register your models here.
from .models import Employee , Group ,Message

# Register your models here.
admin.site.register(Employee)
admin.site.register(Group)
admin.site.register(Message)