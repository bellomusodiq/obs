from django.contrib import admin
from .models import SiteSettings, Widrawal, PhoneNumber
# Register your models here.

admin.site.register(SiteSettings)
admin.site.register(Widrawal)
admin.site.register(PhoneNumber)