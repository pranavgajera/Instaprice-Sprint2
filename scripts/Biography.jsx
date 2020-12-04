import * as React from "react";

export default function Biography(props) {
  return (
    <div className="bio-content">
      <div>
        <img src={props.pfp} className="bio-pfp" />
      </div>
      <div className="bio-info">
        <div className="bio-name">{props.name}</div>
        <ul className="likes-posts">
          <li> Likes: 99 </li>
          <li> Posts: 99 </li>
          <li> Comments: 99 </li>
        </ul>
      </div>
    </div>
  );
}
