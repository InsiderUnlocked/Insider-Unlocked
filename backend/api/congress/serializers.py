from rest_framework import serializers
from .models import CongressTrade, CongressPerson, Ticker


class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = ('ticker', 'company', 'market', 'sector', 'industry',)

class CongressPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CongressPerson
        fields = ('fullName', 'currentParty', 'currentChamber',  'currentState', 'image',)

class CongressTradeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    ticker = serializers.SerializerMethodField()

    # def get_congress_name(self, obj):
        # return '{} {}'.format(obj.name.firstName, obj.name.lastName) 

    class Meta:
        model = CongressTrade
        fields = ('name', 'ticker', 'disclosureDate', 'transactionDate', 'owner', 'ticker', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')
