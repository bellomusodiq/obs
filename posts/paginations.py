from rest_framework.pagination import PageNumberPagination

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 30

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
