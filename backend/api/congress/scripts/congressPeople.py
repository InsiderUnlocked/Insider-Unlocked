# Purpose: This script is used to download the current and historical members of the US Congress

# Import Libraries
from ..models import CongressPerson
import requests
import json

# Intialize Constant URL variables
global currentMembersURL
currentMembersURL = "https://theunitedstates.io/congress-legislators/legislators-current.json"

global historicalMembersURL
historicalMembersURL = "https://theunitedstates.io/congress-legislators/legislators-historical.json"


def getDetails(response):    # turn response into json
    objs = json.loads(response.text)

    # initilize data variable to hold objects for bulk crete
    data = []

    for i in range(len(objs)):
        try:
            bioguide = objs[i]["id"]["bioguide"]
            imageURL = f"https://theunitedstates.io/images/congress/225x275/{bioguide}.jpg"

            # check if there is a full name object
            firstName = objs[i]["name"]["first"]
            lastName = objs[i]["name"]["last"]
            
            if "official_full" in objs[i]["name"]:
                fullName = objs[i]["name"]["official_full"]
            else:
                fullName = firstName + " " + lastName
            

            state = objs[i]["terms"][-1]["state"]
            party = objs[i]["terms"][-1]["party"]
            chamber = "Senator" if objs[i]["terms"][-1]["type"] == "sen" else "House"
            
            termsServed = objs[i]["terms"]


            data.append(CongressPerson(bioguide=bioguide, firstName=firstName, lastName=lastName, fullName=fullName, currentState=state, currentParty=party, currentChamber=chamber, image=imageURL, termsServed=termsServed))

        except Exception as e:
            print(e)
            continue
    
    # bulk add data
    CongressPerson.objects.bulk_create(data, ignore_conflicts=True)

def getCurrentMembers():
    # download file as current-members.json
    response = requests.get(currentMembersURL)
    # with open('./data/currentCongress.json', 'w') as f:
    #     f.write(response.text)
    getDetails(response)    

def getHistoricalMembers():
    # download file as current-members.json
    response = requests.get(historicalMembersURL)
    # with open('./data/historicalCongress.json', 'w') as f:
    #     f.write(response.text)
    getDetails(response)    

def main():
    getCurrentMembers()
    getHistoricalMembers()

main()