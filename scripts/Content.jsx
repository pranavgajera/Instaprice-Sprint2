import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Socket from './Socket';
import LiveFeedButton from './LiveFeedButton';

import "./Content.css"

export default function Content() {
    const [authenticated, setAuthentication] = useState(false);
    const [searched, setSearched] = React.useState(false);          // true if we need to display a search list
    const [searchList, setSearchList] = React.useState([]);
    const [feed, setFeed] = React.useState(false);
    
    function getSearchList() {
        React.useEffect(() => {
            Socket.on('search response', (data) => {
                setSearchList(data['search_list']);
                console.log("got list: ", data);
                setSearched(true);
            });
        }, []);
    }
    
    getSearchList();
    
    function getLiveFeed() {
        React.useEffect(() => {
            Socket.on('go to live feed', (data) => {
                setFeed(true);
            });
        });
    }
    
    getLiveFeed();
    
    useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
    });

    }, []);

    
    if(!authenticated) {
        return (
            <div className="LoginPage">
                <h1>
                    InstaPrice
                </h1>
                <GoogleButton />
            </div>
        );
    }

    return(
        <div className="HomePage">
            <h1>
                InstaPrice
                <LiveFeedButton />
            </h1>
            { searched ? 
            (
                <SearchResults searchList={ searchList } />
            ) : (null)
            }
            <div className="searchbar">
              <SearchBar setSearched={ setSearched }/>
            </div>

            { feed ?
                (
                <div>
                    <LiveFeed />
                </div>
                ) : (null)
            }
        </div>);

}