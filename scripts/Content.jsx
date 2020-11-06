import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import Socket from './Socket';

import "./Content.css"

export default function Content() {
    const [authenticated, setAuthentication] = useState(false);
    const [input, setInput] = useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);
    
    
    // ------------- hacky search list request
    function searchRequest() {
        Socket.emit('search request', {
            'query': 'random query'
        });
        console.log("sending search request")
    }
    // -------------
    
    // ------------- TODO make a homepage that contains these
    const [searchList, setSearchList] = React.useState([]);
    
    function getSearchList() {
        React.useEffect(() => {
            Socket.on('search response', (data) => {
                setSearchList(data['search_list']);
                // hacked setLoggedIn to bypass the fact that we currently
                // dont have a way to get to this point
                setLoggedIn(true);
            });
        }, []);
    }
    
    getSearchList();
    // --------------
    
    
    // -------------- TODO create a homepage to display this from
    if(loggedIn)
        return(
            <div>
                <SearchResults searchList={searchList}/>
            </div>
            );
    // --------------

    useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
    });

    }, []);

    const addformlist = (e) => {
        e.preventDefault();
        Socket.emit('new item', {
          item: input,
        });
        setInput('');
    };
    return(
        <div className={"main-container"}>
            <h1>
                InstaPrice
            </h1>
            <GoogleButton />
            <button onClick={searchRequest}></button>
            {authenticated
                ? (
                    <div className="searchbar">
                      <form htmlFor="newitem" onSubmit={addformlist}>
                        <label htmlFor="textbox">
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                        </label>
                        <button variant="primary" type="submit" value="Submit">Submit</button>
                      </form>
                    </div>
                ) : <GoogleButton />}

        </div>);

}