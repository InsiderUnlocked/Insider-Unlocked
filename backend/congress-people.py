# Purpose: This script is used to download the current and historical members of the US Congress

# Import Libraries
import requests

# Intialize Constant URL variables
global currentMembersURL
currentMembersURL = "https://theunitedstates.io/congress-legislators/legislators-current.json"

global historicalMembersURL
historicalMembersURL = "https://theunitedstates.io/congress-legislators/legislators-historical.json"


def getCurrentMembers():
    # download file as current-members.json
    response = requests.get(currentMembersURL)
    with open('./data/currentCongress.json', 'w') as f:
        f.write(response.text)

def getHistoricalMembers():
    # download file as current-members.json
    response = requests.get(historicalMembersURL)
    with open('./data/historicalCongress.json', 'w') as f:
        f.write(response.text)

def main():
    getCurrentMembers()
    getHistoricalMembers()

main()