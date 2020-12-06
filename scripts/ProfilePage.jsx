import * as React from "react";
import Socket from "./Socket";
import { Link } from "react-router-dom";
import Biography from "./Biography";
import ProfileFeed from "./ProfileFeed";

import "../style/NavBar.css";

export default function ProfilePage(props) {
  function handleBack(e) {
    Socket.emit("go back");
  }

  return (
    <div>
      <nav className="profile-navbar">
        <h1 className="logo">
          <img
            className={"main-picture"}
            src="https://i.imgur.com/g0upGfG.png"
            alt="InstaPrice"
          />
        </h1>

      </nav>

      <div className="profile">
        <div className="leftPage">
          <Biography
            name={props.username}
            pfp={props.pfps}
            bio="Hello, this is my profile page."
          />
        </div>

        <div className="rightPage">
          <ProfileFeed
            username={props.username}
            itemnames={props.itemnames}
            imageurls={props.imageurls}
            usernames={props.usernames}
            times={props.times}
            currprices={props.currprices}
            asins={props.asins}
          />
        </div>
      </div>
    </div>
  );
}
