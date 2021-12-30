import pandas as pd
import yfinance as yf
from datetime import datetime as dt
import time
import numpy as np

# Load in json data
df = pd.read_json('transactions.json')

def specificSenator(name):
    percentageGained = 0

    # Get all transactions by a specific senator
    dfTransactions = df[df['Name'] == name]
    tickers = []
    
    # loop through the transactions
    for ticker in dfTransactions.index:
        # get a list of all the tickers the person bought or sold  
        tickerName = dfTransactions['Ticker'][ticker]
        
        if tickerName != '--' and tickerName not in tickers:
            tickers.append(tickerName)
    
    # Formula to calcualte percentage gain: ((ssp - spp) / spp) * 100

    # loop through all the tickers
    for i in range(len(tickers)):
        dfTicker = pd.DataFrame([], columns =['Name', 'Notification Date', 'Link', 'Transaction Date', 'Owner', 'Ticker', 'Asset Name', 'Asset Type', 'Type', 'Amount', 'Comment']) 

        # get all rows where the ticker is ticker[i] 
        for transaction in dfTransactions.index:
            if dfTransactions['Ticker'][transaction] == tickers[i]:
                # add the row to the dfTicker
                dfTicker = dfTicker.append(dfTransactions.loc[transaction])
        
        # sort the data frame based on transaction date
        dfTicker = dfTicker.sort_values(by = 'Transaction Date', ascending = True)

        buyPrices = []
        
        # iterate through the combined date frame
        for transaction in dfTicker.index:
            try:
                tickerName = dfTicker['Ticker'][transaction][0]
                startDate = dt.strptime(dfTicker['Transaction Date'][transaction], "%m/%d/%Y")

                # get the price of this ticker on that transaction date
                price = yf.Ticker(tickerName).history(period='1d', start=startDate)
                
                # get the head ticker price
                priceStock = price.iloc[0]['Close']
            except:
                continue

            # if its sale
            if dfTicker['Type'][transaction] == 'Sale (Partial)' or dfTicker['Type'][transaction] == 'Sale (Full)':
                # get average number of buyPrices
                print(tickerName)
                try:
                    initial = sum(buyPrices) / len(buyPrices)
                except ZeroDivisionError as e:
                    continue

                # calcualte pergrnatge gain
                gained = ((priceStock - initial) / initial) * 100

                print(buyPrices)
                print("Final: " + str(priceStock) + " | Intial: " + str(initial) + " | Percentage Gained: " + str(gained))
                
                percentageGained += ((priceStock - initial) / initial) * 100
                
                if dfTicker['Type'][transaction] == 'Sale (Full)':
                    buyPrices = []
    
            # if its bought 
            if dfTicker['Type'][transaction] == 'Purchase':
                # add to initial array
                buyPrices.append(priceStock)
                
    return percentageGained

name = "Kyl, Jon (Senator)"
print(specificSenator(name))