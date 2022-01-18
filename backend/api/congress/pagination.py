from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
# from rest_framework import Pagination as pagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 20

