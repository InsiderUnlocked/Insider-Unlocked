from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import CongressTrade, CongressPerson, Ticker
from rest_framework import serializers

class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = ('ticker', 'company', 'market', 'sector', 'industry',)

class CongressPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CongressPerson
        fields = ('fullName', 'currentParty', 'currentChamber',  'currentState', 'image',)

class CongressTradeSerializer(serializers.ModelSerializer):
    name = ReadOnlyField(source='name.fullName')
    ticker = ReadOnlyField(source='ticker.ticker')

    class Meta:
        model = CongressTrade
        fields = ('name', 'ticker', 'disclosureDate', 'transactionDate', 'owner', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')
        # fields = 'al'