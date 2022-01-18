# Import Libraries
from django_filters.rest_framework import DjangoFilterBackend
# Import Libraries
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import CongressPersonSerializer, CongressTradeSerializer
from .models import CongressPerson, CongressTrade, Ticker


# TODO: Remove this in production
# from .scripts.names import currentMembers, prevMembers
# from .scripts.congressPeople import main as updateCongressPersonMain
# from .scripts.house import main as houseMain
# from .scripts.senators import main as senatorsMain
from .populate import historical as populate
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
# TODO: Remove ecerything above this comment in production

# government/congress-trades endpoint
# Returns all of the Congress Transactions
class AllCongressViewSet(viewsets.ModelViewSet):
    # Permission needed to access endpoint
    permission_classes = (permissions.AllowAny,)
    
    # Querying database to get all the transactions
    queryset = CongressTrade.objects.all()

    # Serializing the data (converting to JSON)
    serializer_class = CongressTradeSerializer

    # Adding Logic to filter the data
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['ticker__ticker', 'name']
    search_fields = ['ticker__ticker', 'name']
    # ordering_fields = ['ticker', 'name']
    # ordering = ['transactionDate']


# government/congress-all endpoint
# Returns all of the Congress Peoples Profiles who have made at least one transaction
class AllCongressPeopleViewSet(viewsets.ModelViewSet):
    # Permission needed to access endpoint
    permission_classes = (permissions.AllowAny,)
    # Convering the data to JSON
    serializer_class = CongressPersonSerializer

    # Querying database for all senators that have made at least one or more transactions
    queryset = CongressPerson.objects.filter(totalTransactions__gt=0).order_by('firstName')


# government/ticker endpoint
# Returns all of transactions that involved a specific ticker which is passed in the URL
class TickerViewSet(viewsets.ModelViewSet):
    # Permission needed to access endpoint
    permission_classes = (permissions.AllowAny,)
    # URL parameter passed into url that also exists in the CongressTrade and Ticker models 
    lookup_field = 'ticker'
    # Initiliazing our seializer class
    serializer_class = CongressTradeSerializer

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        # Query Database for the ticker id  
        ticker = Ticker.objects.get(ticker=self.kwargs['ticker'])
        # Use the ticker id to filter all transactions which contain that ticker id
        queryset = CongressTrade.objects.filter(ticker=ticker).order_by('-transactionDate')        
        return queryset

    # Serialize and Paginate the data    
    def retrieve(self, request, *args, **kwargs):
        # Get the queried data
        result = self.get_queryset()

        # Paginate the data
        result_page = self.paginate_queryset(result)
        
        # Serialize the data - (convert to JSON)
        serializer = CongressTradeSerializer(result_page, many=True)

        return self.get_paginated_response(serializer.data)

# government/congress-trades endpoint
# Returns all of the Congress Transactions
class CongressPersonViewSet(viewsets.ModelViewSet):

    # Permission needed to access endpoint
    permission_classes = (permissions.AllowAny,)
    # URL parameter passed into url that also exists in the CongressTrade and CongressPerson models 
    lookup_field = 'name'
    # Initiliazing our seializer class
    serializer_class = CongressTradeSerializer


    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        # Get the name that was passed in the URL
        congressPerson = self.kwargs['name']

        # Parse slug into first and last name
        firstName = congressPerson.split()[0]
        lastName = congressPerson.split()[1]

        # Get the id of the congress person passed into the URL 
        name = CongressPerson.objects.filter(firstName=firstName, lastName=lastName)[0]
        # Get all transactions by congress person
        queryset = CongressTrade.objects.filter(name=name).order_by('-transactionDate')

        return queryset

    # Serialize and Paginate the data    
    def retrieve(self, request, *args, **kwargs):
        # Get the queried data
        result = self.get_queryset()

        # Paginate the data
        result_page = self.paginate_queryset(result)
        
        # Serialize the data - (convert to JSON)
        serializer = CongressTradeSerializer(result_page, many=True)

        return self.get_paginated_response(serializer.data)


# TODO: Summary Stats -- Still a Work in Progress
# government/summary-stats endpoint
class SummaryStatsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CongressPersonSerializer

    # Total Trade Volume
    # Trade Type Ration
    # Number of Transactions