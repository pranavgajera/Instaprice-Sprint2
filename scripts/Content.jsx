import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import DetailedView from './DetailedView';
import Socket from './Socket';
import Feed from './Feed';
import FacebookButton from "./FacebookButton"
import '../style/Content.css';

export default function Content() {
  const [authenticated, setAuthentication] = useState(false);
  const [searched, setSearched] = React.useState(false); // true if we need to display a search list
  const [searchList, setSearchList] = React.useState([]);
  const [username, setUsername] = useState('');
  const [profpic, setProfpic] = useState('');
  const [detailed, setDetailed] = React.useState(false) // true if there is a detailed request
  const [detailedList, setDetailedList] = React.useState([]);

  function getSearchList() {
    React.useEffect(() => {
      Socket.on('search response', (data) => {
        setSearchList(data.search_list);
        // console.log('got list: ', data);
        setSearched(true);
      });
    }, []);
  }
  
  function getDetailedView() {
    React.useEffect(() => {
      Socket.on('detail view response', (data) => {
        setDetailedList(data);
        setDetailed(true);
      });
    }, []);
  }

  getSearchList();
  getDetailedView();

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
      { detailed
        ? (
          <DetailedView
            detailedList={detailedList}
            closeDetailedList={() => setDetailed(false)}
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
    
    
  );
}
