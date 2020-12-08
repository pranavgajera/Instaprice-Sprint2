import React from "react";
import DetailedViewButton from "./DetailedViewButton";
import ProfileButton from "./ProfileButton";

import "../style/ProfilePage.css";

export default function Feed(props) {
  return (
    <div className="profile-feed">
      <h1>{props.username}'s Recent searches!</h1>
      <ol>
        {props.itemnames.map((itemname, index) => (
          <li key={itemname}>
            <div className="PostItem">
              <div className="PostGrid">
                <img
                  className={"product-image"}
                  src={props.imageurls[index]}
                  alt="product"
                />
                <div className={"other-information"}>
                  <h4>{props.itemnames[index]}</h4>
                  <h4>
                    Current price:
                    {props.currprices[index]}
                  </h4>
                  <h4>
                    Posted by:
                    {props.usernames[index]}
                  </h4>
                  <h4>
                    on {props.times[index]}
                  </h4>
                  <DetailedViewButton
                    activeOnlyWhenExact={true}
                    to={"/item/" + props.asins[index]}
                    label={"View More Details"}
                    itemname={props.itemnames[index]}
                    username={props.username}
                    imgurl={props.imageurls[index]}
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
