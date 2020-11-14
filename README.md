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