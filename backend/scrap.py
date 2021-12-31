def specificSenator(name):
    dfTransactions = df[df['Name'] == name]

    amounts = dfTransactions['Amount'].value_counts()
    listOfAmounts = ['$1,001', '$15, 001', '$50, 001', '$250, 001']
    intsOfAmounts = [1001, 15001, 50001, 250001]
    sumMin = 0
    sumMax = 0
    #iterate through the amount of each transaction 
    for i in range(len(amounts.index)):
        # iterate through the 
        for j in range(len(listOfAmounts)):
            if listOfAmounts[j] in str(amounts.values):
                sumMin += intsOfAmounts[j] 

    # print cols

    # values = a.index
    # nums = a.values

    print(sumMin)
    

    
specificSenator('Sullivan, Dan (Senator)')
