import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Socket from './Socket';
import Feed from './Feed';
import ProfilePage from './ProfilePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import NavBar from './NavBar';

import '../style/Content.css';


export default function Content() {
  const [authenticated, setAuthentication] = useState(false);
  const [searched, setSearched] = React.useState(false); // true if we need to display a search list
  const [searchList, setSearchList] = React.useState([]);
  const [username, setUsername] = useState('');
  const [profpic, setProfpic] = useState('');
  const [profileOf, setProfileOf] = useState("");

  useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
      setUsername(data.username);
      setProfpic(data.profilepicture);
    });
  }, []);
  
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
  
  getSearchList();
  
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
  const [currprices, setCurrprices] = useState([]);
  
  function getProfilePage() {
    React.useEffect(() => {
      Socket.on('make profile page', (data) => {
        setProfileOf(data.username);
        console.log("This is the page for: /" + data.username);
        setItemname(data.itemnames);
        setImageurl(data.imageurls);
        setPricehist(data.pricehists);
        setUsernames(data.usernames);
        setPfp(data.pfps);
        setTime(data.times);
        setCurrprices(data.currprices);
      });
    }, []);
  }
  
  getProfilePage();

  if (!authenticated) {
    return (
      <div>
        <NavBar />
        <LandingPage />
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
              itemnames={itemnames}
              imageurls={imageurls}
              pricehists={pricehists}
              usernames={usernames}
              pfps={pfps}
              times={times}
              currprices={currprices}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    
    
  );
}
