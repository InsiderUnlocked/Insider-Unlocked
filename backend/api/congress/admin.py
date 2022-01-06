from django.contrib import admin
from .models import CongressPerson, CongressTrade, Ticker

# Register your models here.
class TickerAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'company', 'market', 'sector', 'industry',)
    search_fields = ['ticker']

class CongressPersonAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'firstName', 'lastName', 'currentParty', 'currentChamber', 'currentState', 'totalTransactions',)
    # list_filter = ('transactionDate',)
    search_fields = ['fullName']

class CongressTradeAdmin(admin.ModelAdmin):
    list_display =  ('disclosureDate', 'transactionDate', 'owner', 'ticker', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')
    list_filter = ('transactionDate', 'name__currentChamber')
    search_fields = ['ticker']


admin.site.register(Ticker, TickerAdmin)
admin.site.register(CongressPerson, CongressPersonAdmin)
admin.site.register(CongressTrade, CongressTradeAdmin)