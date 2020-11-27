import * as React from 'react';
import { useEffect, useState } from 'react';
import Socket from './Socket';
import { Link } from 'react-router-dom';
import Biography from './Biography';
import { GiPriceTag } from "react-icons/gi"; 

import '../style/NavBar.css';

export default function ProfilePage(props) {
  
  function handleBack(e) {
    Socket.emit('go back');
  }

return (
  <div>
    <nav className="profile-navbar">
      <h1 className="logo">
        InstaPrice
        <GiPriceTag />
      </h1> 
      <div class="loginButtons">
        <Link to='/' onClick={handleBack}> Go back to searches </Link>
      </div>
    </nav>

    <div className="profile">
      <div className="topPage">
        <Biography
          name = {props.username}
          pfp = {props.pfps}
          bio = "Hello, this is my profile page."
        />
        <div className="profile-feed">
          <h1>{props.username}'s Recent searches!</h1>
          <ol>
            {props.itemnames.map((itemname, index) => (
              <li key={itemname}>
                <img className="profile-feed-image" src={props.imageurls[index]} alt="product" />
                <br />
                { props.itemnames[index] }
                {' '}
                <br />
                {' '}
                Historical price:
                { props.pricehists[index] }
                {' '}
                <br />
                {' '}
                Posted by:
                {' '}
                { props.usernames[index] }
                {' '}
                on
                {' '}
                { props.times[index] }
                {' '}
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="bottomPage">
        <div className="comments">
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
          PLACEHOLDER
        </div>
      </div>
    </div>
  </div>
  );
}

