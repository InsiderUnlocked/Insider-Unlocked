    # loop through the sales
    for sale in dfSales.index:
        # Get the sales ticker
        salesLST = dfSales['Ticker'][sale]
        # if the ticker is not there than ignore iteration
        if salesLST == "--":
            continue
        # loop through the purcahses
        for purchase in dfPurchases.index:
            # get the purchases ticker
            purchasesLST = dfPurchases['Ticker'][purchase]
            # if the ticker is not there ignore itearation
            if purchasesLST == "--":
                continue
            # shorten the data frame check for purcahses that occur before the sale date
            if dt.strptime(dfPurchases['Transaction Date'][purchase], "%m/%d/%Y") < dt.strptime(dfSales['Transaction Date'][sale], "%m/%d/%Y")
            dfPurchasesDate = dfPurchases[dt.strptime(dfPurchases['Transaction Date'][purchase], "%m/%d/%Y") < dt.strptime(dfSales['Transaction Date'][sale], "%m/%d/%Y")]

            print(dfPurchaseDate.head(10))
            
            
            
          
            # # check for purchases tha have the same ticker as sale
            # if purchasesLST[0] == salesLST[0]:
            #     print(purchaseLST[0])
            #     print(salesLST[0])
        # # Calculate pergrnatge gained
        # ticker = yf.Ticker(dfSales['Ticker'][sale])
        
        # # Get the price of the date its sold at
        # soldPrice = ticker.history(start = dfSales['Transaction Date'][sale], end = "")
        
        # # compare the two too see the return
        
                    
                        # Get all sales from all the transactions of the senator
    dfSalesPartial = dfTransactions[dfTransactions['Type'] == 'Sale (Partial)']
    dfSalesFull = dfTransactions[dfTransactions['Type'] == 'Sale (Full)']
    dfSales = pd.concat([dfSalesPartial, dfSalesFull])

    # Get all purchases from all the transactions of the senator
    dfPurchases = dfTransactions[dfTransactions['Type'] == 'Purchase']     
