import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Socket from './Socket';
import Feed from './Feed';
import ProfilePage from './ProfilePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import NavBar from './NavBar';
import DetailedItem from './DetailedItem';

import '../style/Content.css';


export default function Content() {
  const [authenticated, setAuthentication] = useState(false);
  const [searched, setSearched] = React.useState(false); // true if we need to display a search list
  const [searchList, setSearchList] = React.useState([]);
  const [username, setUsername] = useState('');
  const [profpic, setProfpic] = useState('');
  const [profileOf, setProfileOf] = useState("");
  const [detailOf, setDetailOf] = useState("");
  
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
  const [userpfps, setUserpfps] = useState([]);
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
        setUserpfps(data.pfps);
        setTime(data.times);
        setCurrprices(data.currprices);
      });
    }, []);
  }
  
  getProfilePage();
  
  const [pricehistory, setPricehistory] = useState([]);
  // const [show, setShow] = useState(false);
  // const [title, setTitle] = useState("");
  // const [imgurl, setImgurl] = useState("");
  const [user, setUser] = useState("");
  const [pfp, setPfp] = useState("");
  // const [time, setTime] = useState("");
  // const [error, setError] = useState(true);
  // const [graphurl, setGraphurl] = useState("");
  const [asin, setAsin] = useState("");
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dataset, setDataset] = useState([]);
  const [datapts, setDatapts] = useState([]);
  
  function getDetailsPage() {
    React.useEffect(() => {
      Socket.on("detail view response", (data) => {
        console.log("This is the page for the product: /" + data.username);
        // setTitle(data.itemname);
        // setImgurl(data.imgurl);
        setPricehistory(data.pricehistory);
        setUser(data.username);
        setPfp(data.pfp);
        // setGraphurl(data.graphurl);
        setMean(data.mean);
        setVariance(data.variance);
        setMin(data.min_price);
        setMax(data.max_price);
        setAsin(data.asin);
        setLikes(data.likes);
        setDataset(data.dataset);
        setDatapts(data.datapts);
        setDetailOf(data.asin);
      });
    }, []);
  }
  
  getDetailsPage();

  if (!authenticated) {
    return (
      <div>
        <NavBar />
        <LandingPage />
      </div>
    );
  }

  return (
    <div className={".main-container"}>
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
                  <img className={"main-picture"} src="./static/instapricelogo.png" alt="InstaPrice" />
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
          <Route path={'/profile/' + profileOf}>
            <ProfilePage
              username={profileOf}
              itemnames={itemnames}
              imageurls={imageurls}
              pricehists={pricehists}
              usernames={usernames}
              pfps={userpfps}
              times={times}
              currprices={currprices}
            />
          </Route>
          <Route path={'/item/' + detailOf}>
            <DetailedItem
              pricehistory={pricehistory}
              pfp={pfp}
              user={user}
              asin={asin}
              mean={mean}
              variance={variance}
              min={min}
              max={max}
              likes={likes}
              dataset={dataset}
              datapts={datapts}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    
    
  );
}
