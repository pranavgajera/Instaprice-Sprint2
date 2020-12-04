import * as React from "react";
import { Link } from "react-router-dom";
import Socket from "./Socket";

export default function Biography(props) {
  function handleBack(e) {
    Socket.emit("go back");
  }
  return (
    <div className="bio-content">
      <div class="goback">
        <Link to="/" onClick={handleBack}>
          {" "}
          Go back to searches{" "}
        </Link>
      </div>
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
