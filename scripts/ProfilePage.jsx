import * as React from 'react';
import { useEffect, useState } from 'react';
import Socket from './Socket';
import { Link } from 'react-router-dom';


export default function ProfilePage(props) {
  const [user, setUser] = useState("");
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsername] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
  
  // useEffect(() => {
  //   Socket.on('make profile page', (data) => {
  //     setUser(data.username);
  //     setItemname(data.itemnames);
  //     setImageurl(data.imageurls);
  //     setPricehist(data.pricehists);
  //     setUsername(data.usernames);
  //     setPfp(data.pfps);
  //     setTime(data.times);
  //     console.log("Hello!" + data.username);
  //     console.log(data.itemnames)
  //   });
  // });

  function updateItems(data) {
    setUser(data.username);
    setItemname(data.itemnames);
    setImageurl(data.imageurls);
    setPricehist(data.pricehists);
    setUsername(data.usernames);
    setPfp(data.pfps);
    setTime(data.times);
  }

  function getNewItems() {
    React.useEffect(() => {
      Socket.on('make profile page', updateItems);
      return () => {
        Socket.off('make profile page', updateItems);
      };
    });
  }
  
  getNewItems();
  
  function handleBack(e) {
    Socket.emit('go back');
  }

return (
  <div>
    <h1>
      <img src="./static/instapricelogo.png" alt="InstaPrice" />
      {user}'s Profile
    </h1>
    <div>
      <Link to='/' onClick={handleBack}> Go back to searches </Link>
    </div>
    <div className="feedbox" id="feedBody">
      <h1>{user}'s Recent searches!</h1>
      <ol>
        {itemnames.map((itemname, index) => (
          <li key={itemname}>
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
          </li>
        ))}
      </ol>
    </div>
  </div>
  );
}

