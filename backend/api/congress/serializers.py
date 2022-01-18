# Purpose: Converts SQLite data to JSON

# Import Libraries
from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import CongressTrade, CongressPerson, Ticker
from rest_framework import serializers

class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        # Database table
        model = Ticker
        # Fields to appear on the response
        fields = ('ticker', 'company', 'market', 'sector', 'industry',)

class CongressPersonSerializer(serializers.ModelSerializer):
    class Meta:
        # Database table
        model = CongressPerson
        # Fields to appear on the response
        fields = ('fullName', 'currentParty', 'currentChamber',  'currentState', 'image',)

class CongressTradeSerializer(serializers.ModelSerializer):
    # Gets ForignKey field to appear on the response, refer to ERD Diagram to get a better understanding of the connection between the models
    name = ReadOnlyField(source='name.fullName')
    ticker = ReadOnlyField(source='ticker.ticker')

    class Meta:
        # Database table
        model = CongressTrade
        # Fields to appear on the response
        fields = ('name', 'ticker', 'disclosureDate', 'transactionDate', 'owner', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')
    