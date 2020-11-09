import React, { useState, useEffect } from 'react';
import Socket from './Socket';

import "./Feed.css"

export default function Feed() {
    const [itemnames, setItemname] = useState([]);
    const [itemid, setItemid] = useState([]);
    const [currprice, setCurrPrice] = useState([]);
    const [graphimg, setGraphimg] = useState([]);
    const [productimg, setProductimg] = useState([]);
    const [producturl, setProducturl] = useState([]);
        
    function updateItems(data) {
    setItemname(data.allItemnames);
    setItemid(data.allItemids);
    setGraphimg(data.allGraphimgs);
    setCurrPrice(data.allCurrprice);
    setProductimg(data.allProductimgs);
    setProducturl(data.allProducturls);
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
                        <li key={index}><img src={ productimg[index] } alt = 'product image' /><br></br>{ itemnames[index] } <br></br> Current price:{ currprice[index] } <a href={ producturl[index] }>Check it out on Amazon!</a> </li>)}
                </ol>
        </div>
    );
}