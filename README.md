
# InstaPrice

A browser-based price tracker application where users can type in about a product and the application will respond with the price history of that specific product. User will also be allowed to make a post about a product to the public feeds where other users can view the post with more detailed price information about that perticular product. 

## Heroku Link: [https://instaprice-490.herokuapp.com/](https://instaprice-490.herokuapp.com/)
# Setting up
1. To start using this project clone this repository by running `git clone https://github.com/pranavgajera/Instaprice-Sprint2` and then `cd Instaprice-Sprint2`
2. Then install all the dependencies by running ` npm install && sudo pip3 install -r requirements.txt`
3.
4. Update yum: `sudo yum update` and enter yes to all prompts.
5. Upgrade pip: `sudo /usr/local/bin/pip install --upgrade pip`  
6. To setup the API's used in the project sign up for both the API's through RapidAPI at [https://rapidapi.com/](https://rapidapi.com/)
   to use [https://rapidapi.com/ajmorenodelarosa/api/amazon-price1/](https://rapidapi.com/ajmorenodelarosa/api/amazon-price1)
   and [https://rapidapi.com/Megatvini/api/amazon-price-history](https://rapidapi.com/Megatvini/api/amazon-price-history)
7. After signing up for the API's create a `secret_tokens.env` file and add the following lines into the file:
  ` RAPID_API_KEY=Your Key `
8. To setup the google login button while starting up the application install this npm package by typing `npm install react-google-login`
   before starting up the application. Additional information about the npm package could be found at https://www.npmjs.com/package/react-google-login.
   After installing the npm package, follow the below steps to get the google login button setup:
   - Firstly go to https://console.developers.google.com/ and sign up using for the google developer account using your personal email.
   - Create a new project and name it based on your preference.
   - To initally setup a OAuth ID on a new project, the product name on the consent screen needs to be set up by following the steps below:
     1. Click the "CONFIGURE CONSENT SCREEN" button.
     2. Choose "External" and pick a application name.
     3. Press save.
   - Then after finishing that step, go to credintials -> Create Credentials -> OAuth client ID. Click "web application" and your application 
     should be ready to go .
   - Then replace the clientID in the the GoogleButton.jsx file and the application should be ready to start.
9. To setup facebook login button while starting up the application install this npm package by typing `npm install react-facebook-login` before starting up the application. Additional information about the npm package could be found at [https://www.npmjs.com/package/react-facebook-login](https://www.npmjs.com/package/react-facebook-login). After installing the npm package, follow the below steps to get the facebook login button setup:
	- Firstly go to https://developers.facebook.com/ and sign up using your regular facebook account.
	- Create a new app and select everything else when it asks for the application purpose and then name it based on your preference.
	- Use the application app id and replace it in the FacebookButton.jsx file.
	- Then go to the seetings of the application and enable Client OAuth login and Web OAuth login and in the valid oauth redirect URL add the developemtn url 	      for your working enviroment.
	- After following all the above steps the facebook login should be ready for the users to login with their facebook accounts.
10. Install react icons by running `npm install react-icons` see documentation here [https://www.npmjs.com/package/react-icons](https://www.npmjs.com/package/react-icons)
11. Install chartjs and chartjs2 by running `npm install react-chartjs` and `npm install react-chartjs-2` see documentation here [https://www.npmjs.com/package/react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
12. Install react-router-dom by running `npm install react-router-dom` see documentation here [https://www.npmjs.com/package/react-router-dom](https://www.npmjs.com/package/react-router-dom)
# Setting up the Database
1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`    
    Enter yes to all prompts.    
2. Initialize PSQL database: `sudo service postgresql initdb`    
3. Start PSQL: `sudo service postgresql start`    
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER`    
    :warning: :warning: :warning: If you get an error saying "could not change directory", that's okay! It worked! :warning: :warning: :warning:    
5. Make a new database: `sudo -u postgres createdb $USER`    
        :warning: :warning: :warning: If you get an error saying "could not change directory", that's okay! It worked! :warning: :warning: :warning:    
6. Make sure your user shows up:    
    a) `psql`    
    b) `\du` look for ec2-user as a user    
    c) `\l` look for ec2-user as a database    
7. Make a new user:    
    a) `psql` (if you already quit out of psql)    
    b) :warning: :warning: :warning: REPLACE THE [VALUES] IN THIS COMMAND! Type this with a new (short) unique password. I recommend 4-5 characters - it doesn't have to be very secure. Remember this password!   
        `create user [some_username_here] superuser password '[some_unique_new_password_here]';`    
    d) `\q` to quit out of sql    
8. `cd` into `InstaPrice-Sprint2` and open `secret_tokens.env` and add `DATABASE_URL='postgresql://[your_unique_sql_username_here]:[your_unique_sql_password_here]@localhost/postgres'`
9. Fill in SQL_USER and SQL_PASSWORD values with the values you put in 7. b)  
10. Run `source secret_tokens.env`

# Enabling read/write from SQLAlchemy  
There's a special file that you need to enable your db admin password to work for:  
1. Open the file in vim: `sudo vim /var/lib/pgsql9/data/pg_hba.conf`
If that doesn't work: `sudo vim $(psql -c "show hba_file;" | grep pg_hba.conf)`  
2. Replace all values of `ident` with `md5` in Vim: `:%s/ident/md5/g`  

# Running
1. Run the application by running `npm run watch` on one terminal and `python app.py` in another terminal to start the application.

# Heroku Deployement
1. First create a free account on [https://www.heroku.com/](https://www.heroku.com/)
2. Log into heroku in your terminal by running `heroku login -i`
3. Create a heroku database by running `heroku addons:create heroku-postgresql:hobby-dev` and then `heroku pg:wait`
4. Make sure you are the rightful owner of your local database
	- Run `psql`
	- `ALTER DATABASE Postgres OWNER to [your_unique_sql_username_from_7b];`
	- `\l`
	- Make sure the Postgres database's Owner is [your_unique_sql_username_from_7b]
5. Run `PGUSER=[your_unique_sql_username_from_7b] heroku pg:push postgres DATABASE_URL`
	- enter your password from 7. b)
6. Commit your changes and then run `git push heroku master`
7. Your Heroku App should be live!


    


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
