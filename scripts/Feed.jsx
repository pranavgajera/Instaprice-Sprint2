import React, { useState, useEffect } from 'react';
import Socket from './Socket';

import "./Feed.css"

export default function Feed() {
    const [itemnames, setItemname] = useState([]);
    const [imageurls, setImageurl] = useState([]);
    const [pricehists, setPricehist] = useState([]);
    const [usernames, setUsername] = useState([]);
    const [pfps, setPfp] = useState([]);
    const [times, setTime] = useState([]);
        
    function updateItems(data) {
    setItemname(data.allItemnames);
    setImageurl(data.allImageurls);
    setPricehist(data.allPricehists);
    setUsername(data.allUsernames)
    setPfp(data.allPfps);
    setTime(data.allTimes);
    const feedBody = document.querySelector('#feedBody');
    feedBody.scrollTop = feedBody.scrollHeight - feedBody.clientHeight;
  }

  function getNewItems() {
    React.useEffect(() => {
      Socket.on('its feeding time', updateItems);
      return () => {
        Socket.off('its feeding time', updateItems);
      };
    });
  }

  getNewItems();
    
    return (
        <div className = "feedbox" id="feedBody">
        <h1>Recent searches!</h1>
                <ol>
                    {itemnames.map((itemname, index) =>
                        <li key={index}><img src={ imageurls[index] } alt = 'product image' /><br></br>{ itemnames[index] } <br></br> Historical price:{ pricehists[index] } <br></br> Posted by: { usernames[index] } on { times[index] } </li>)}
                </ol>
        </div>
    );
}