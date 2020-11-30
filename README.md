# InstaPrice

A browser-based price tracker application where users can type in about a product and the application will respond with the price history of that specific product.

## Heroku Link: https://instaprice490.herokuapp.com/
# Cloning this project to the local enviroment
1. To start using this project clone this repository by running ` https://github.com/pranavgajera/InstaPrice`
2. Then install all the dependencies by running ` npm install && pip install -r requirements.txt`
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
6. Getting PSQL to work with Python  
  
   1. Update yum: `sudo yum update`, and enter yes to all prompts    
   2. Upgrade pip: `sudo /usr/local/bin/pip install --upgrade pip`  
   3. Get psycopg2: `sudo /usr/local/bin/pip install psycopg2-binary`    
   4. Get SQLAlchemy: `sudo /usr/local/bin/pip install Flask-SQLAlchemy==2.1`    
  
7. .Setting up PSQL  
  
   1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`    
       Enter yes to all prompts.    
   2. Initialize PSQL database: `sudo service postgresql initdb`    
   3. Start PSQL: `sudo service postgresql start`    
   4. Make a new superuser: `sudo -u postgres createuser --superuser $USER`    
       If you get an error saying "could not change directory", that's okay! It worked!  
   5. Make a new database: `sudo -u postgres createdb $USER`    
           If you get an error saying "could not change directory", that's okay! It worked!  
   6. Make sure your user shows up:    
       a) `psql`    
       b) `\du` look for ec2-user as a user    
       c) `\l` look for ec2-user as a database    
   7. Make a new user:    
       a) `psql` (if you already quit out of psql)    
       ## REPLACE THE [VALUES] IN THIS COMMAND! Type this with a new (short) unique password.   
       b) I recommend 4-5 characters - it doesn't have to be very secure. Remember this password!  
           `create user [some_username_here] superuser password '[some_unique_new_password_here]';`    
       c) `\q` to quit out of sql    
   8. Prep SQLAlchemy by running these commands:
       ```
       $python
       $import models
       $models.DB.create_all()
       $models.DB.session.commit()
       ```
   9. `cd` into `Instaprice-Sprint2` and make a new file called `sql.env` and add the following fields into it 
      export SQL_USER="[user_name]"
      export SQL_PASSWORD="[password]"
      export SQL_DB="[database]"
      export DB_HOST="localhost"
      export DATABASE_URL="postgresql://[user_name]:[password]@localhost/[database]"
      
      where [user_name] and [password] are the values created in the prior step and database is the name 
      of the database that the relations were created in.
  
  
8. Enabling read/write from SQLAlchemy  
   There's a special file that you need to enable your db admin password to work for:  
   1. Open the file in vim: `sudo vim /var/lib/pgsql9/data/pg_hba.conf`
   If that doesn't work: `sudo vim $(psql -c "show hba_file;" | grep pg_hba.conf)`  
   2. Replace all values of `ident` with `md5` in Vim: `:%s/ident/md5/g`  
   3. After changing those lines, run `sudo service postgresql restart`  
   4. Ensure that `sql.env` has the username/password of the superuser you created!  
   5. Run your code!    
     a) `npm run watch`. If prompted to install webpack-cli, type "yes"    
     b) In a new terminal, `python app.py`    
     c) Preview Running Application (might have to clear your cache by doing a hard refresh)    
   
10. Run the application by running `yarn run watch` on one terminal and `python app.py` in other terminal
    to start the application. 
11. To push the application to heroku follow this steps:
    - Firstly create a new app on heroku.
    - Then to have a postgres databse on heroku install heroku postgres through add ons.
    - Then follow the steps provided by heroku after creating the application for this project.
    - To get the API working on heroku the API keys from the secret_tokens.env files needs to be inputted in the 
     config variables in the heroku app settings
    - After following the above steps push onto heroku by running the following command
      `git push heroku main`
      and the application should be ready to go.
    - Open the application by clicking open app and the application should be ready to go.

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
