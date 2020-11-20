import pickle
import api_calls as price_history_test
import datetime
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib
import numpy as np

def generate_graph(entry_list, post_id="test"):
	"""Takes two inputs:
	entry_list - the output of the price_history function, a list of dicts
	post_id - the unique id representing the post in the DB. Used to assign filename.
	Returns nothing at the moment. Should return the image_url for the generated graph.
	"""
	date_list = []
	price_list = []
	num_points = int(len(entry_list))
	first_point = len(entry_list)-num_points
	last_point = len(entry_list)
	for i in range(first_point, last_point):
		entry = entry_list[i]
		date_string = entry["price_date"]
		entry_datetime = datetime.datetime.strptime(date_string, '%m/%d/%Y')
		date_list.append(entry_datetime)
		price_list.append(entry["price"])

	# data
	df=pd.DataFrame({'x': date_list, 'y': price_list })

	# Combine data
	plt.plot(date_list, price_list)

	# Add Title
	plt.title("Price History")

	# Add horizontal lines
	plt.gca().yaxis.grid()

	# Format x axis to have dates
	plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
	plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=int(num_points/12)))
	plt.gcf().autofmt_xdate()

	# Format y axis to have $ symbol
	formatter = matplotlib.ticker.FormatStrFormatter('$%1.2f')
	plt.gca().yaxis.set_major_formatter(formatter)

	# Display in window
	# plt.show()
	file_name = "graphs/graph_{}.png".format(post_id)
	plt.savefig(file_name)

def loadPickle(filename):
	"""Local helper function to open a pickled response"""
	file = open(filename, 'rb')
	return pickle.load(file)

def main():
	"""Tests the generate_graph function"""
	search_results = loadPickle("search_results.pkl")
	ASIN = search_results.json()[0]["ASIN"]
	print(ASIN)

	entry_list = price_history_test.mock_price_history("B07X6C9RMF")

	print(entry_list[:10])
	single_entry = entry_list[0]
	single_date = single_entry['price_date']
	single_datetime = pd.to_datetime([single_date], format='%m/%d/%Y')


	generate_graph(entry_list, "Test ID")

if __name__ == '__main__':
    main()