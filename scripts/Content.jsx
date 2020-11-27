import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Socket from './Socket';
import Feed from './Feed';
import ProfilePage from './ProfilePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FacebookButton from "./FacebookButton";
import '../style/Content.css';


export default function Content() {
  const [authenticated, setAuthentication] = useState(false);
  const [searched, setSearched] = React.useState(false); // true if we need to display a search list
  const [searchList, setSearchList] = React.useState([]);
  const [username, setUsername] = useState('');
  const [profpic, setProfpic] = useState('');
  const [profileOf, setProfileOf] = useState("");

  function getSearchList() {
    React.useEffect(() => {
      Socket.on('search response', (data) => {
        if(Array.isArray(data.search_list)) {
          setSearchList(data.search_list);
        } else {
          setSearchList([]);
        }
        setSearched(true);
      });
    }, []);
  }
  
  function getProfilePage() {
    React.useEffect(() => {
      Socket.on('make profile page', (data) => {
        setProfileOf(data.username);
        console.log("This is the page for: /" + data.username);
      });
    }, []);
  }
  
  getProfilePage();
  getSearchList();
  
  useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
      setUsername(data.username);
      setProfpic(data.profilepicture);
    });
  }, []);

  if (!authenticated) {
    return (
      <div className="LoginPage">
        <h1>
          <img src="./static/instapricelogo.png" alt="InstaPrice" />
        </h1>
        <GoogleButton />
        <FacebookButton />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <div className="HomePage">
              { searched
                ? (
                  <SearchResults
                    searchList={searchList}
                    username={username}
                    pfp={profpic}
                    closeSearchList={() => setSearched(false)}
                  />
                ) : (null)}
                
              <div className="Content">
                <h1>
                  <img src="./static/instapricelogo.png" alt="InstaPrice" />
                </h1>
                <div className="searchbar">
                  <SearchBar />
                </div>
                <div className="Feed">
                  <Feed />
                </div>
              </div>
          </div>
          </Route>
          <Route path={'/' + profileOf}>
            <ProfilePage
              username={profileOf}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    
    
  );
}
