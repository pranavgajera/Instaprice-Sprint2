## Heroku Link: https://cs490-instaprice.herokuapp.com/

## Task Distribution
* Pranavkumar Gajera
    * Boilerplate Code for React and Flask
    * Google OAuth login functionality
    * Implemented a search bar used to look up Amazon products
    * Enabled the price history of a search result to be displayed after being selected
    * Unit testing for python files
* Shuo Zhang
    * Set up database to store all of our persistent data
    * Enabled price history along with user details to be added to database as a post
    * Unit testing for database
    * Added a live feed to the main page
* Erik Eckenberg
    * Linted the front and backend of our application
    * Added the functionality of displaying search results after using the search bar
    * Debugged parts of code related to certain API calls
    * Debugged parts of code related to socket calls
* Jason Morgado
    * Handled Heroku deployment
    * Found and implemented the API that we used
    * Created mocked API calls to help with initial development
* Jeffrey Kuo
    * Enabled each search result to be toggleable by the user
    * Added a post button that each search result that will post the search details to the live feed
    * Finalized README

# InstaPrice

A browser-based price tracker application where users can type in about a product and the application will respond with the price history of that specific product.

## Team

Section 5 Group 0
* Shuo Zhang
  * Email: [sz376@njit.edu](sz376@njit.edu)
  * Github: [github.com/sz376](https://github.com/sz376)
* Erik Eckenberg
  * Email: [ete2@njit.edu](ete2@njit.edu)
  * Github: [https://github.com/ete2njit](https://github.com/ete2njit)
* Jason Morgado
  * Email: [jm768@njit.edu](jm768@njit.edu)
  * Github: [https://github.com/domo106](https://github.com/domo106)
* Jeffrey Kuo
  * Email: [jkk24@njit.edu](jkk24@njit.edu)
  * Github: [https://github.com/jkk24](https://github.com/jkk24)
* Pranavkumar Gajera
  * Email: [pvg25@njit.edu](pvg25@njit.edu)
  * Github: [https://github.com/pranavgajera](https://github.com/pranavgajera)

## Deliverables
We aim to deliver a price history application that is accessible from the browser. The application will provide a login where users can log in and check the price history of a certain product (for example a camera). The response will then be posted in the timeline (the historical price of that camera in the form of a graph) which will stay persistent so that other users could check what other users have searched for.

## Motivation
Although there are quite a few applications that track the price history of products, we’ve found that there is a lack of social media integration with these apps, we want to create a web application where users can not only look at the price history of the products they want but also be able to share the search they did through the application to other users.

## Approach
We’ll be building a web app using Flask in the backend and React/JS in the frontend, tied together using Socket.io. The app will feature social login via Google, and be deployed on Heroku. We will use either the eBay or amazon API to collect pricing data. Depending on the return types of the API’s, we will also use a python library to convert the datasets into images we can display.

## Dependencies and risks
* We researched the eBay and amazon API’s, and will use any API fulfilling a similar role. The core feature of our app will rely on the chosen API.
* Finally, as our app is deployed on Heroku, we have a hard dependency on Heroku functioning for our app to work.
* Scaling will be concerning as the user base gets large, the free storage from Heroku might not be enough to handle all the data.

## MVP User Stories
*As a user, I should be able to log in via Google, so that I can identify myself uniquely to other users of the website.*
* Login with Google button is present on page when I am logged out.
* The Login button takes me to Google login OAuth flow
* My profile picture is pulled from Google
* My real name is pulled from Google
* My name and profile picture are displayed on my profile page, and next to price checking requests I make

*As a user, I should be able to send a query for a specific product and receive a price history for that product so I can determine pricing trends and make a judgment on whether to purchase the product.*
* User is uniquely identified
* Send button and input areas are always on the screen and visible
* When I click the send button, the input area is cleared and the message is sent to the server
* When I press enter, the input area is cleared and the message is sent to the server
* The user receives a dataset that indicates the historical price data for the inputted product

*As a user, I should be able to search for a  product and receive a list of products that I can choose from.*
* A shopping API search is called (eg “camera”)
* A page with search results matching the query is returned (eg “SONY DH-222”, “NIKON EE-33”)
* A small preview is provided with the current price
* An image preview for the different models is also provided
* A user can click on a model and proceed to the next endpoint

*As a user, I can get the price history of a selected product, and have the option to post said price history.*
* I should be able to see the price history for the product that I searched for.
* I should be able to save the price history temporarily
* I should be able to post the price history to the timeline
* I should be able to make a comment about the price history of the product if I choose to post it
* I should be able to choose to ignore the post, and not post it

*As a user, I should be able to view other people’s search queries that they passed in the application so that everyone can look at what anyone else searched for.*
* I should be able to view the product search done by other people in the application.
* I should search for more than one product in the application.
* I should be able to click into the user profile that previously sends a search query for a particular product to get more information about the user.
* I should be able to see if there are more people online on the application looking through the products.
* I should be able to get the search results that are passed in by other users online at the same time they receive the response from the application

## Sprint 2 User Stories
*As a user, I should be able to see the search results in graph form with the raw price history in the left.*
* I should be able to view graphs from the data set returned by the application.
* I should be able to see the price history and the graph in the same post if the user decided to post his/her search done on the application.
* I should be able to see the link provided under the graph which is the link to more information about the graph.
* I should be able to see the small graph description provided under the graph.
* Posts by other users are also in graph form.

*As a user, I should be able to see additional information about the query.*
* Display the historical lowest and highest price.
* Display the variance.
* Display the mean.
* See the trend of the price, whether it is going up or down.
* Include a link to direct the user to the item in question on sale on amazon/eBay.

*As a user, I should be able to interact with the search posts done by other users in the past.*
* There is a comment section where users could post their comments about the search query.
* The comment should display the message along with the name and profile picture of the commenter.
* Comments can be deleted.
* The post should display a button to like the search done by the other users.
* The comments will persist so that when other users sign in to the application they should be able to see all the interaction done on the previous posts done by the other users.

*As a user, I should be able to view posts sorted by likes.*
* The post section will now have an option to sort by certain criteria:
  * sort by the number of likes.
  * sort by newest first.
  * Sort at random.
  * Sort with keywords.

*As a user, I should be able to filter search results.*
* Results from the search query.
* Sort by price.
* Comments can be deleted.
* Sort by newest/oldest.
* Sort by closest match by letters.
* Sort by rating.
* API specific sorting.

*As a user, I should be able to access user profile pages.*
* I should be able to see the other user’s profile picture on their page.
* Sort by price
* I should be able to see the other users name on their page.
* I should be able to access my own profile page.
* My own profile page should be visually different from other user’s profile pages.
* Users can add a bio to their own profile.

*As a user, I should see additional information on other users on their profile pages*
* The profile page should display the user data as described in the MVP story.
* The profile page should display all queries made by the user.
* I should be able to see the other users name on their page.
* I should be able to access the queries as I would if they were on a timeline.
* Improved profile styling.
* A counter for total LIKES the user received.

## Mocks
![Google Login](https://i.imgur.com/TbUlt2f.png)
![Main page with searchbar](https://i.imgur.com/SUIyTNf.png)
![User profile page](https://i.imgur.com/srgfV5T.png)
![Price data view](https://i.imgur.com/HA2r6oz.png)

## Sprint Milestones
### *Milestone 1 - MVP*
The base of the app is the core price checking functionality that allows multiple users to post price histories of items to a common timeline. Users will be able to do this by searching for an item, and finding the item on a list of all relevant items returned by our search. This is captured in the set of mvp user stories above, and is what we aim to have fully finished by this checkpoint. Since we need to figure out which API’s allow us to best find such price data on items, we anticipate this milestone to be unpolished, which will be fixed by the second milestone.
### *Milestone 2 - Polish*
Building on the above, we’d like to add styling to the page to make it look like the mockups presented in the above section. We’d also like to add one more section in the response received by the application after the user searches for a product with a graph section in the search results based on the price history data received from the user search.  We’d also like to add some sorting options on the profile of the user and also the timeline in the main page of the application where the old posts shared by the users are presented.





