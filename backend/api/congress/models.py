from django.db.models import signals
from .signals import tradesCount
from django.db import models
from jsonfield import JSONField

# Names of Congress
class CongressPerson(models.Model):
    # bioguide
    bioguide = models.CharField(max_length=100, unique=True)
    # first name
    firstName = models.CharField(max_length=1000)
    
    # last name
    lastName = models.CharField(max_length=1000)
    
    # full name
    fullName = models.CharField(max_length=1000)
    
    # current party
    currentParty = models.CharField(max_length=100) 
    
    # current chamber
    currentChamber = models.CharField(max_length=100)
    
    # current state
    currentState = models.CharField(max_length=100)
    
    # congress person image
    image = models.CharField(max_length=10000)
    
    # terms
    termsServed = models.JSONField(default=None, blank=True, null=True)
    
    # total transactions
    totalTransactions = models.IntegerField(default=0, editable=False)

    def __str__(self):
        return self.fullName

    # Update congress persons transaction count every time the object is saved 
    def tradesCount(self):
        count = CongressTrade.objects.filter(name=self).count()
        self.totalTransactions = count
        self.save()


# Tickers Tables
class Ticker(models.Model):
    # stock ticker
    ticker = models.CharField(max_length=100, unique=True)
    
    # company name 
    company = models.CharField(max_length=1000)

    # marketcap 
    marketcap = models.IntegerField(blank=True, null=True)
    # sector
    sector = models.CharField(max_length=1000)
    # industry
    industry = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.ticker
    
# Combination of Senator and House Data
class CongressTrade(models.Model):
    # PRIMARY KEY (connect to another table with congress persons names)
    name = models.ForeignKey(CongressPerson, on_delete=models.CASCADE)
    
    # PRIMARY KEY (connect to another table with ticker name)
    ticker = models.ForeignKey(Ticker, on_delete=models.CASCADE, null=True)

    # transaction date
    transactionDate = models.DateField(blank=True, null=True)
    
    # disclosure date
    disclosureDate = models.DateField(blank=True, null=True)

    # transaction type
    transactionType = models.CharField(max_length=60, blank=True)
    
    # amount spent (this is a range)
    amount = models.CharField(max_length=60, blank=True)
    
    # owner of transaction (spouce, child, etc)
    owner = models.CharField(max_length=60)

    # asset description
    assetDescription = models.CharField(max_length=1000, blank=True)
    
    # asset details
    assetDetails = models.CharField(max_length=1000, blank=True, null=True)

    # asset type (Stock, Bond)
    assetType = models.CharField(max_length=1000, blank=True)

    # source link
    ptrLink = models.CharField(max_length=100)
    
    # comment
    comment = models.CharField(max_length=1000, blank=True)
    
    # is the transaction a pdf
    pdf = models.BooleanField()
    

    def __str__(self):
        return self.name.fullName
    

    class Meta:
        unique_together = ('disclosureDate', 'transactionDate', 'owner', 'ticker', 'assetDescription', 'assetType', 'transactionType', 'amount', 'comment', 'name', 'pdf', 'ptrLink')
        ordering = ["-transactionDate"]

# Signals to update total transactions for each congress member
signals.post_save.connect(tradesCount, sender=CongressTrade)
signals.post_delete.connect(tradesCount, sender=CongressTrade)