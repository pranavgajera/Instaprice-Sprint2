import * as React from 'react';

import '../style/ProfilePage.css';

export default function Biography(props) {
  
  return (
    <div className="bio-content">
      <div>
        <img src={props.pfp} className="bio-pfp"/>
      </div>
      <div className="bio-info">
        <div className="bio-name">
          {props.name}
        </div>
        <p className="bio-bio">
          {props.bio}        
        </p>
        <div className="likes-posts">
          Likes: 99
          Posts: 99
        </div>
      </div>
    </div>
  );
}