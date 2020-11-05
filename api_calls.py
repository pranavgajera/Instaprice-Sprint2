"""
Handles the API calls for Amazon searches and price histories
Also loads mocked responses for testing
"""
import os
import pickle
import requests
import dotenv

# Source the env file automatically
DOTENV_PATH = os.path.join(os.path.dirname(__file__), "secret_tokens.env")
dotenv.load_dotenv(DOTENV_PATH)

API_URL = "https://rapidapi.p.rapidapi.com/search"
RAPID_API_KEY = os.environ["RAPID_API_KEY"]

def save_pickle(filename, obj):
    """
    Saves a Python object obj to a file with name filename
    Currently unused
    """
    file = open(filename, 'wb')
    pickle.dump(obj, file)
    file.close()

def load_pickle(filename):
    """
    Takes the filename of a pickle output
    Outputs the saved Python object inside.
    """
    file = open(filename, 'rb')
    return pickle.load(file)

def mock_search_response():
    """
    Returns the mocked HTTP Response object for an amazon search
    can extract a dict using .json() on the returnvalue
    """
    search_results = load_pickle("search_results.pkl")
    return search_results

def mock_price_history():
    """Returns the mocked HTTP response for price history"""
    price_history = load_pickle("price_history.pkl")
    return price_history

def search_amazon(query_text):
    """
    Performs an Amazon search with given query_text
    Returns the List of search results as dicts
    Each dict contains "ASIN", "title", "imageUrl", "detailPageURL" and others as keys
    Note: 150 calls/mo + 0.01/extra call
    """
    headers = {
        'x-rapidapi-key':  RAPID_API_KEY,
        'x-rapidapi-host': "amazon-price1.p.rapidapi.com"
    }
    params = {
        "keywords": query_text,
        "marketplace":"US"
    }
    resp = requests.get(API_URL, headers=headers, params=params)
    if resp.status_code != 200:
        print("There was an error with getting amazon search results. Error: {}"\
        .format(resp.status_code))
        return None
    print("Search response OK")
    response_data = resp.json()
    return response_data

def fetch_price_history(asin):
    """
    Takes the ASIN of an amazon product
    Returns a list of dicts for price history
    Each dict contains "price" and "price_date"
    Note: 5 calls/day + 0.02/extra call
    """
    headers = {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "amazon-price-history.p.rapidapi.com",
        "useQueryString": "true"
    }
    params = {
        "asin": asin,
        "price_type": "amazon"
    }

    resp = requests.get(API_URL, headers=headers, params=params)
    if resp.status_code != 200:
        print("There is an error with fetching price history. Error: {}".format(resp.status_code))
        return None
    print("Price History Response OK")
    history_data = resp.json()
    price_list = history_data["price_history"]
    return price_list
