import pickle
import api_calls as price_history_test
import datetime
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib
import numpy as np

def generate_graph(entry_list, multiplier=1.0):
	"""Takes two inputs:
	entry_list - the output of the price_history function, a list of dicts
	multiplier - A float from 0.25 to 1.0, the fraction of dates that go on the graph.
	1.0 is an entire year, 0.25 is three months, 1/12 is one month.
	Takes most recent dates.
	Returns nothing at the moment. Should return the image_url for the generated graph.
	"""
	date_list = []
	price_list = []
	num_points = int(len(entry_list)*multiplier)
	first_point = len(entry_list)-num_points
	last_point = len(entry_list)
	for i in range(first_point, last_point):
		entry = entry_list[i]
		date_string = entry["price_date"]
		entry_datetime = datetime.datetime.strptime(date_string, '%m/%d/%Y')
		print(type(entry_datetime))
		date_list.append(entry_datetime)
		price_list.append(entry["price"])



	# data
	df=pd.DataFrame({'x': date_list, 'y': price_list })

	# Combine data
	plt.plot(date_list, price_list)

	# Add Title
	plt.title("Price History")

	# Add horizontal lines
	plt.gca().xaxis.grid()
	plt.gca().yaxis.grid()

	# Format x axis to have dates
	plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
	plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=int(num_points/12)))
	plt.gcf().autofmt_xdate()

	# Format y axis to have $ symbol
	formatter = matplotlib.ticker.FormatStrFormatter('$%1.2f')
	plt.gca().yaxis.set_major_formatter(formatter)

	# Display in window
	plt.show()

def loadPickle(filename):
	"""Local helper function to open a pickled response"""
	file = open(filename, 'rb')
	return pickle.load(file)

#search_results = amazon_search_test.search_products("Camera")
#savePickle("search_results",search_results)

search_results = loadPickle("search_results.pkl")
ASIN = search_results.json()[0]["ASIN"]
print(ASIN)

entry_list = price_history_test.mock_price_history("B07X6C9RMF")
#savePickle("price_history.pkl", price_history)

#price_history = loadPickle("price_history.pkl")
#price_list = price_history.json()['price_history']
print(entry_list[:10])
single_entry = entry_list[0]
single_date = single_entry['price_date']
print(single_date)
single_datetime = pd.to_datetime([single_date], format='%m/%d/%Y')
print(single_datetime)


divisor = 1.0
generate_graph(entry_list, divisor)