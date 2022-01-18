# Import Libraries
from .models import CongressPerson, Ticker, CongressTrade
from .scripts.ticker import getTickerData
from django.db.models import Q
import json
import time
import datetime

# Get or Create Ticker Object
def getTicker(stockTicker):
    try:
        if stockTicker == "--":
            return None

        tickerObj, created = Ticker.objects.get_or_create(ticker=stockTicker)

        if created == True:
            sector, industry, company, marketcap = getTickerData(stockTicker)
            
            tickerObj.sector = sector
            tickerObj.industry = industry
            tickerObj.company = company
            tickerObj.marketcap = marketcap
            tickerObj.save()
        
        return tickerObj
    except Exception as e:
        print(e)
        print("ERROR: " + str(stockTicker))

# Get or Create Congress Person Object
def getCongressPerson(name):
    edge_cases = {
        "Pat Roberts": "Patrick Roberts",
    }

    # find congress person object in database table CongressPerson
    # "Collins, Susan M. (Senator)" --> "Susan M. Collins"
    name = name.replace(" (Senator)", "")

    # add everything before the comma to everything after the comma
    name =  name.split(',')[-1] + " " + name.split(',')[0]
    # remove trailing whitespace
    name = name.strip()

    firstName = name.split()[0]
    lastName = name.split()[-1]

    if name in edge_cases:
        name = edge_cases[name]

    try:
        # time.sleep(2)
        congressPerson, created = CongressPerson.objects.get_or_create(firstName=firstName, lastName=lastName)
        if created == True:
            congressPerson.name = name
            congressPerson.save()
        return congressPerson

    except Exception as e:
        print(name)
    # check to see if name already exists in database
    congressPerson = CongressPerson.objects.filter(Q(fullName=name) | Q(firstName=firstName) | Q(lastName=lastName))

    if len(congressPerson) == 0:
        if "Former" not in name:
            print(name)   
            print(congressPerson)   
            exit() 
    else:
        return congressPerson[0]

def updateCongressPersonCount():
    count = CongressPerson.objects.all().count()
    print(count)
    i = 1
    for congressPerson in CongressPerson.objects.all():
        congressPerson.totalTransactions = CongressTrade.objects.filter(name=congressPerson).count()
        congressPerson.save()

        print("Done: ", str(i))
        i += 1


def main():
    # Load historical data
    data = json.load(open("./congress/transactions.json"))
    objs = []
    i = 0
    for row in data:
        if i == 200:
            break
        i += 1
        # Get all values in a variable
        name = row['Name']

        # convert dates into proper format
        notificationDate = datetime.datetime.strptime(row['Notification Date'], '%m/%d/%Y').strftime('%Y-%m-%d')
        transactionDate = datetime.datetime.strptime(row['Transaction Date'], '%m/%d/%Y').strftime('%Y-%m-%d')
        
        source = row['Link']
        ticker = row['Ticker']
        owner = row['Owner']
        assetDescription = row['Asset Name']
        assetType = row['Asset Type']
        transactionType = row['Type']
        amount = row['Amount']
        comment = row['Comment']

        # check if assetName contains a list
        if type(assetDescription) == list:

            # Check for Rates/Matures, and Options details
            if "Rates/Matures" in assetDescription[1] or "put" in assetDescription[1] or "call" in assetDescription[1]:
                assetDetails = assetDescription[1]
            else:
                assetDetails = None
            assetDescription = assetDescription[0]

        # Create Ticker if theres a ticker
        ticker = getTicker(ticker[0])
        congressPerson = getCongressPerson(name)

        # Create Congress Trade Object and add it to objs
        objs.append(CongressTrade(
            name=congressPerson,
            ticker=ticker, 
            transactionDate=transactionDate, 
            disclosureDate=notificationDate, 
            transactionType=transactionType, 
            amount=amount, 
            owner=owner, 
            assetDescription=assetDescription, 
            assetDetails=assetDetails,
            assetType=assetType, 
            comment=comment, 
            pdf=False, 
            ptrLink=source
        ))

    # bult create array objs 
    print(objs)
    CongressTrade.objects.bulk_create(objs, ignore_conflicts=True)

    updateCongressPersonCount()
