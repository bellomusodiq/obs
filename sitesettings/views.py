from django.shortcuts import render
from .models import SiteSettings
from rest_framework import viewsets
from .serializers import SiteSettingSerializer
# Create your views here.

class SiteSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSettingSerializer
    queryset = SiteSettings.objects.all()