import * as React from 'react';
import GoogleButton from './GoogleButton';
import SearchResults from './SearchResults';
import Socket from './Socket';

export function Content() {
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
    
    return(
        <div>
            <h1>
                Hello World from React!
            </h1>
            <GoogleButton />
            <button onClick={searchRequest}></button>
        </div>);

}