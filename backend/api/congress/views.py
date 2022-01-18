# Import Libraries
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .serializers import CongressPersonSerializer, CongressTradeSerializer
from .models import CongressPerson, CongressTrade, Ticker

from rest_framework.response import Response
# from .pagination import StandardResultsSetPagination

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Django Background Tasks
# from .scripts.names import currentMembers, prevMembers
# from .scripts.congressPeople import main as updateCongressPersonMain
# from .scripts.house import main as houseMain
# from .scripts.senators import main as senatorsMain
from .populate import main as populate

# TODO: Django Background Task
class TempDBUpdatesViewSet(viewsets.ModelViewSet):
    # # Test gov contracts
    # try:
    # govContractsMain()
    # except:
    #     pass

    # # Add/Update CongressPerson Table (Get all members)
    # try:
    #     currentMembers()
    # except:
    #     pass

    # try:
    #     prevMembers()
    # except:
    #     pass

    # try:
    #     houseMain()
    # except:
    #     pass

    # try:
    #     senatorsMain()
    # except:
    #     pass

    # try:
        # updateCongressPersonMain()
    # except:
        # pass

    # print("DONE!")
    # populate()
    pass

class AllCongressViewSet(viewsets.ModelViewSet):

    permission_classes = (permissions.AllowAny,)
    # get all senators that have made a transaction
    queryset = CongressTrade.objects.all()
    serializer_class = CongressTradeSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['ticker', 'name']
    search_fields = ['ticker', 'name']
    ordering_fields = ['ticker', 'name']
    ordering = ['transactionDate']



class AllCongressPeopleViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CongressPersonSerializer

    # get all senators that have made a transaction
    queryset = CongressPerson.objects.filter(totalTransactions__gt=0).order_by('firstName')


class SummaryStatsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CongressPersonSerializer

    # get all senators that have made a transaction

    queryset = CongressPerson.objects.all().order_by('firstName')

    # Total Trade Volume
    # Trade Type Ration
    # Number of Transactions

class CongressPersonViewSet(viewsets.ModelViewSet):
    # Get slug from url
    # permission_classes = (permissions.AllowAny,)    
    lookup_field = 'name'
    serializer_class = CongressTradeSerializer
    queryset = CongressTrade.objects.all()

    def get_queryset(self):
        congressPerson = self.kwargs['name']

        # Allow dashes in slug
        congressPerson = congressPerson.replace('-', ' ')

        # Parse slug
        firstName = congressPerson.split()[0]
        lastName = congressPerson.split()[1]

        # get all transactions by congress person
        name = CongressPerson.objects.filter(firstName=firstName, lastName=lastName)[0]
        queryset = CongressTrade.objects.filter(name=name).order_by('-transactionDate')

        return queryset

    def retrieve(self, request, *args, **kwargs):
        result = self.get_queryset()

        result_page = self.paginate_queryset(result)
        serializer = CongressTradeSerializer(result_page, many=True)

        return self.get_paginated_response(serializer.data)

       


class TickerViewSet(viewsets.ModelViewSet):
    # Get slug from url
    # permission_classes = (permissions.AllowAny,)    
    lookup_field = 'ticker'
    serializer_class = CongressTradeSerializer
    queryset = CongressTrade.objects.all()

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        ticker = Ticker.objects.get(ticker=self.kwargs['ticker'])
        queryset = CongressTrade.objects.filter(ticker=ticker).order_by('-transactionDate')        
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        result = self.get_queryset()

        result_page = self.paginate_queryset(result)
        serializer = CongressTradeSerializer(result_page, many=True)

        return self.get_paginated_response(serializer.data)

