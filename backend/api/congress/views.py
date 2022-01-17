# Import Libraries
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .serializers import CongressPersonSerializer, CongressTradeSerializer
from .models import CongressPerson, CongressTrade, Ticker

from rest_framework.response import Response
from .pagination import StandardResultsSetPagination

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
    serializer_class = CongressTradeSerializer

    # get all senators that have made a transaction
    queryset = CongressTrade.objects.all().order_by('transactionDate')


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
        name = CongressPerson.objects.get(firstName=firstName, lastName=lastName)
        queryset = CongressTrade.objects.filter(name=name).order_by('-transactionDate')

        return queryset

    def retrieve(self, request, *args, **kwargs):
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)
       


class TickerViewSet(viewsets.ModelViewSet):
    # Get slug from url
    # permission_classes = (permissions.AllowAny,)    
    queryset = CongressTrade.objects.all()
    serializer_class = CongressTradeSerializer  
    lookup_field = 'ticker'

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        ticker = Ticker.objects.get(ticker=self.kwargs['ticker'])
        print(ticker)

        queryset = CongressTrade.objects.filter(ticker=ticker).order_by('-transactionDate')
        print(queryset)

        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)
    
    

