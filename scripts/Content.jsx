import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import Socket from './Socket';

import "./Content.css"

export default function Content() {
    const [authenticated, setAuthentication] = useState(false);
    const [input, setInput] = useState('');
    const [searched, setSearched] = React.useState(false);
    
    
    
    // ------------- TODO make a homepage that contains these
    const [searchList, setSearchList] = React.useState([]);
    
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
    // --------------
    

    useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
    });

    }, []);

    const addformlist = (e) => {
        e.preventDefault();
        Socket.emit('search request', {
          'query': input,
        });
        setInput('');
        setSearched(true);
    };
    return(
        <div className={"main-container"}>
            <h1>
                InstaPrice
            </h1>
            {authenticated
                ? (
                    searched ? 
                    (
                        <div>
                            <SearchResults searchList={ searchList } />
                        </div>
                    ) :
                    (
                        <div className="searchbar">
                          <form htmlFor="newitem" onSubmit={addformlist}>
                            <label htmlFor="textbox">
                              <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                              />
                            </label>
                            <button onClick={addformlist} variant="primary" type="submit" value="Submit">Submit</button>
                          </form>
                        </div>)
                ) : <GoogleButton />}

        </div>);

}