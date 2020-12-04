import * as React from "react";
import Socket from "./Socket";
import { Link } from "react-router-dom";
import Biography from "./Biography";
import ProfileFeed from "./ProfileFeed";
import { GiPriceTag } from "react-icons/gi";

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
        <div class="loginButtons">
          <Link to="/" onClick={handleBack}>
            {" "}
            Go back to searches{" "}
          </Link>
        </div>
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
            pricehists={props.pricehists}
            usernames={props.usernames}
            pfps={props.pfps}
            times={props.times}
            currprices={props.currprices}
          />
        </div>
      </div>
    </div>
  );
}
