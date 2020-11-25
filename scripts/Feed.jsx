import React, { useState } from 'react';
import Socket from './Socket';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton'

import '../style/Feed.css';

export default function Feed() {
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsername] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
  const [likes, setLikes] = useState([]);

  function updateItems(data) {
    setItemname(data.allItemnames);
    setImageurl(data.allImageurls);
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

  getNewItems();

  return (
    <div className="feedbox" id="feedBody">
      <h1>Recent searches!</h1>
      <ol>
        {itemnames.map((itemname, index) => (
          <li key={itemname}>
            <img className={"product-image"} src={imageurls[index]} alt="product" />
            <div className={"other-information"}>
                <h4>{ itemnames[index] }</h4>
                <h4>Historical price:
                { pricehists[index] }</h4>
                <h4>Posted by: 
                <ProfileButton
                  activeOnlyWhenExact={true}
                  to={'/' + usernames[index]}
                  label={ usernames[index] }
                  username ={ usernames[index] }
                />
                on 
                { times[index] }</h4>
                <h4>Likes:
                { likes[index] }</h4>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
