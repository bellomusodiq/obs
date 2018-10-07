from django.shortcuts import render
from .models import Ad
from rest_framework import viewsets
from .serializers import AdSerializer
# Create your views here.

class AdViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all().order_by("?")[:3]
    serializer_class = AdSerializer