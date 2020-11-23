"""Contains function that generates graphs for posts and saves them to file."""
import pickle
import datetime
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib
import api_calls


def generate_graph(entry_list, post_id="test"):
    """Takes two inputs:
    entry_list - the output of the price_history function, a list of dicts
    post_id - the unique id representing the post in the DB. Used to assign filename.
    Returns nothing at the moment. Should return the image_url for the generated graph.
    """
    date_list = []
    price_list = []
    num_points = int(len(entry_list))
    for entry in entry_list:
        date_string = entry["price_date"]
        entry_datetime = datetime.datetime.strptime(date_string, "%m/%d/%Y")
        date_list.append(entry_datetime)
        price_list.append(entry["price"])


    # Combine data
    plt.plot(date_list, price_list)

    # Add Title
    plt.title("Price History")

    # Add horizontal lines
    plt.gca().yaxis.grid()

    # Format x axis to have dates
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%m/%d/%Y"))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=int(num_points / 12)))
    plt.gcf().autofmt_xdate()

    # Format y axis to have $ symbol
    formatter = matplotlib.ticker.FormatStrFormatter("$%1.2f")
    plt.gca().yaxis.set_major_formatter(formatter)

    # Display in window
    file_name = "graphs/graph_{}.png".format(post_id)
    plt.savefig(file_name)


def main():
    """Tests the generate_graph function"""
    entry_list = api_calls.mock_price_history("B07X6C9RMF")
    generate_graph(entry_list, "Test ID")

if __name__ == "__main__":
    main()
