# Purpose: Get financial data of stock from yahoo finance

# Import Libraries
import yfinance as yf


def main(ticker):
    data = yf.Ticker(ticker)
    sector = data.info['sector']
    industry = data.info['industry']
    # if industry has '—', only get first part
    if '—' in industry:
        industry = industry.split('—')[0]

    company = data.info['longName']

    marketcap = data.info['marketCap']
    return sector, industry, company, marketcap

# sector, industry, company, marketcap = main("AAPL")
