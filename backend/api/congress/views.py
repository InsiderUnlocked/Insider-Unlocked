# Import Libraries
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .serializers import CongressPersonSerializer, CongressTradeSerializer
from .models import CongressPerson, CongressTrade, Ticker

# Django Background Tasks
# from .scripts.names import currentMembers, prevMembers
# from .scripts.updateCongressPerson import main as updateCongressPersonMain
# from .scripts.house import main as houseMain
# from .scripts.senators import main as senatorsMain


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
    #     updateCongressPersonMain()
    # except:
    #     pass

    # print("DONE!")

    pass

class AllCongressViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CongressPersonSerializer

    # get all senators that have made a transaction
    queryset = CongressPerson.objects.filter(totalTransactions__gt=0).order_by('-totalTransactions')

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


class TickerViewSet(viewsets.ModelViewSet):
    # Get slug from url
    # permission_classes = (permissions.AllowAny,)    
    lookup_field = 'ticker'
    queryset = CongressTrade.objects.all()
    serializer_class = CongressTradeSerializer  

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        ticker = self.kwargs['ticker']
        queryset = CongressTrade.objects.filter(ticker=ticker).order_by('-transactionDate')
 
        return queryset

