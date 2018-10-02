from django.shortcuts import render
from .models import Witdraw
from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import WitdrawalSerializer
from posts.paginations import LargeResultsSetPagination
# Create your views here.


class WitdrawalViewSet(viewsets.ModelViewSet):
    serializer_class = WitdrawalSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        queryset = Witdraw.objects.all()
        date = self.request.GET.get('date')
        if date:
            queryset = queryset.filter(date__icontains=date)
        return queryset


    def create(self, request, *args, **kwargs):
        if request.user.is_admin:
            return Response({'data': 'error'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()
