import React, { useState } from 'react';
import Socket from './Socket';
<<<<<<< HEAD
import DetailedViewButton from './DetailedViewButton';
=======
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton'
>>>>>>> master

import '../style/Feed.css';

export default function Feed() {
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsername] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
<<<<<<< HEAD
  const [clicked, setClicked] = useState(false);
=======
  const [likes, setLikes] = useState([]);
>>>>>>> master

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
<<<<<<< HEAD
            <img src={imageurls[index]} alt="product" />
            <br />
            { itemnames[index] }
            {' '}
            <br />
            {' '}
            Historical price:
            { pricehists[index] }
            {' '}
            <br />
            {' '}
            Posted by:
            {' '}
            { usernames[index] }
            {' '}
            on
            {' '}
            { times[index] }
            {' '}
            <br />
            <DetailedViewButton
            itemname={ itemnames[index] }
            />
=======
            <div className="PostGrid">
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
            </div>
>>>>>>> master
          </li>
        ))}
      </ol>
    </div>
  );
}
