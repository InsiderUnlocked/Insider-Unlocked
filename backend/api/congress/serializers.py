# Purpose: Converts SQLite data to JSON

# Import Libraries
from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import CongressTrade, CongressPerson, Ticker, SummaryStat
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

    # add totalVolume from SummaryStat table
    totalVolume = serializers.SerializerMethodField('get_total_volume')
    total = serializers.SerializerMethodField('get_total')
    purchases = serializers.SerializerMethodField('get_purchases')
    sales = serializers.SerializerMethodField('get_sales')


    def get_total_volume(self, obj):
        # get the total volume from SummaryStat table
        obj = SummaryStat.objects.get(timeframe=90)
        return obj.totalVolume

    def get_total(self, obj):
        # get the total volume from SummaryStat table
        obj = SummaryStat.objects.get(timeframe=90)
        return obj.total

    def get_purchases(self, obj):
        # get the total volume from SummaryStat table
        obj = SummaryStat.objects.get(timeframe=90)
        return obj.purchases

    def get_sales(self, obj):
        # get the total volume from SummaryStat table
        obj = SummaryStat.objects.get(timeframe=90)
        return obj.sales

    class Meta:
        # Database table
        model = CongressTrade
        # Fields to appear on the response
        fields = ('name', 'ticker', 'totalVolume', 'total', 'purchases', 'sales', 'disclosureDate', 'transactionDate', 'owner', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')

class SummaryStatSerializer(serializers.ModelSerializer):
    class Meta:
        # Database table
        model = SummaryStat
        # Fields to appear on the response
        fields = "__all__"