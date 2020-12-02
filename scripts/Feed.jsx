import React, { useState } from 'react';
import Socket from './Socket';
import DetailedViewButton from './DetailedViewButton';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton'

import '../style/Feed.css';

export default function Feed() {
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [currprices, setCurrprice] = useState('');
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsername] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [likes, setLikes] = useState([]);

  function updateItems(data) {
    setItemname(data.allItemnames);
    setImageurl(data.allImageurls);
    setCurrprice(data.allCurrprices);
    setPricehist(data.allPricehists);
    setUsername(data.allUsernames);
    setPfp(data.allPfps);
    setTime(data.allTimes);
    setLikes(data.allLikes);
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
  
  function getNewPost() {
    React.useEffect(() => {
      
    })
  }

  getNewPost();
  getNewItems();

  return (
    <div className="feedbox" id="feedBody">
      <h1>Recent searches!</h1>
      <ol>
        {itemnames.map((itemname, index) => (
          <li key={itemname}>
            <div className="PostItem">
              <div className="PostGrid">
                <img className={"product-image"} src={imageurls[index]} alt="product" />
                <div className={"other-information"}>
                  <h4>{ itemnames[index] }</h4>
                  <h4>Current price:
                  { currprices[index] }
                  </h4>
                  <h4>Posted by:  
                  <ProfileButton
                    activeOnlyWhenExact={true}
                    to={'/' + usernames[index]}
                    label={ usernames[index] }
                    username ={ usernames[index] }
                  />
                   on  
                  { times[index] }</h4>
                  <DetailedViewButton
                  itemname={ itemnames[index] }
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
