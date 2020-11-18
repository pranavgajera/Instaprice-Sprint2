# InstaPrice

A browser-based price tracker application where users can type in about a product and the application will respond with the price history of that specific product.

## Heroku Link: https://instaprice490.herokuapp.com/
# Cloning this project to the local enviroment
1. To start using this project clone this repository by running 
` https://github.com/pranavgajera/InstaPrice`
2. Then install all the dependencies by running
 ` npm install && pip install -r requirements.txt`
3. To setup the API's used in the project sign up for both the API's through RapidAPI at https://rapidapi.com/
   to use https://rapidapi.com/ajmorenodelarosa/api/amazon-price1 
   and https://rapidapi.com/Megatvini/api/amazon-price-history.
4. After signing up for the API's create a secret_tokens.env file and add the following lines int the file:
  ` RAPID_API_KEY=Your Key `
5. To setup the google login button while starting up the application install this npm package by typing `npm install react-google-login`
   before starting up the application. Additional information about the npm package could be found at https://www.npmjs.com/package/react-google-login.
   After installing the npm package, follow the below steps to get the google login button setup:
   - Firstly go to https://console.developers.google.com/ and sign up using for the google developer account using your personal email.
   - Create a new project and name it based on your preference.
   - To initally setup a OAuth ID on a new project, the product name on the consent screen needs to be set up by following the steps below:
     1. Click the "CONFIGURE CONSENT SCREEN" button.
     2. Choose "External" and pick a application name.
     3. Press save.
   - Then after finishing that step, go to credintials -> Create Credentials -> OAuth client ID. Click "web application" and your application 
     should be readt to go .
   - Then replace the clientID in the the GoogleButton.jsx file and the application should be ready to start.
6. Prep SQLAlchemy by running these commands:
   ```
   $python
   $import models
   $models.db.create_all()
   $models.db.session.commit()
   ```
7. Run the application by running `yarn run watch` on one terminal and `python app.py` in other terminal
    to start the application. 
8. To push the application to heroku follow this steps:
    - Firstly create a new app on heroku.
    - Then to have a postgres databse on heroku install heroku postgres through add ons.
    - Then follow the steps provided by heroku after creating the application for this project.
    - To get the API working on heroku the API keys from the secret_tokens.env files needs to be inputted in the 
     config variables in the heroku app settings
    - After following the above steps push onto heroku by running the following command
      `git push heroku main`
      and the application should be ready to go.
    - Open the application by clicking open app and the application should be ready to go.
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

# Linting

## ES-lint

no-unused-vars: These lint errors remain as they refer to variables we are not currently using, but will need to scale our app in Sprint 2. For ease of
coherence and scalability we included these variables already.

no-shadow: 'clicked' is already declared in the upper scope (ResultItem.jsx). Our use of clicked in this context seems perfectly reasonable to us, as it
is the proper way to utilize useEffect, and therefore we have elected to ignore it.

jsx-a11y/no-static-element-interactions: Using a div with on click simply makes the most sense to us here.

jsx-a11y/click-events-have-key-events: Adding a keyboard listener makes no sense in the given context. The rule states it exists for ease of use to the 
physically impaired, but adding a different key to each button in our list seems unreasonable and wouldnt make it more user friendly.

react/forbid-prop-types: Our array in this case contains elements that are dictionaries of multiple strings, so expanding the proptype to be array of 
dicts of strings seems unhelpful, and we are electing to ignore this rule as well.

## PY-lint

 Instance of 'SQLAlchemy' has no {x} member: Doesn't detect inherited members. Not actual issues.
 Instance of 'scoped_session' has no {x} member: Same as above
 
 Import "import models" should be placed at the top of the module (wrong-import-position): Importing at the top causes the program to break due to cyclical
 import nature of app.DB and models.
 
Cyclic import (app -> models) (cyclic-import): They are co-dependent, so this is unavoidable as far as we can tell.

Too many arguments (7/5) (too-many-arguments): Separating some arguments into dicts/arrays would make no sense here, so adhering to 
this rule would be more harmful to our codebase than useful.

Too few public methods (1/2) (too-few-public-methods): We have no need for more public methods. models.py is not used for the same 
purposes classes are usually used for, so rules created as guidelines also do not apply the same, and we elected to ignore it.
 
Unused argument 'search_text' (unused-argument)
Unused argument 'asin' (unused-argument): Both of these arguments are to provide consistency in how we call the actual API calls, and the
mocked API calls in api_calls.py.
