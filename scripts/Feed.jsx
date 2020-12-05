import React, { useState } from "react";
import Socket from "./Socket";
import PropTypes from "prop-types";
import DetailedViewButton from "./DetailedViewButton";
import ProfileButton from "./ProfileButton";

import "../style/Feed.css";

export default function Feed(props) {
  const [itemnames, setItemname] = useState([]);
  const [asins, setAsin] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [currprices, setCurrprice] = useState("");
  const [usernames, setUsername] = useState([]);
  const [times, setTime] = useState([]);

  function updateItems(data) {
    setItemname(data.allItemnames);
    setImageurl(data.allImageurls);
    setCurrprice(data.allCurrprices);
    setUsername(data.allUsernames);
    setAsin(data.allAsins);
    setTime(data.allTimes);
    const feedBody = document.querySelector("#feedBody");
    feedBody.scrollTop = feedBody.scrollHeight - feedBody.clientHeight;
  }

  function getNewItems() {
    React.useEffect(() => {
      Socket.on("its feeding time", updateItems);
      return () => {
        Socket.off("its feeding time", updateItems);
      };
    });
  }
  
  function getNewPost() {
    React.useEffect(() => {
      Socket.on("latest post", (data) => {
        setItemname((itemnames) => [...itemnames, data.itemname]);
        setAsin((asins) => [...asins, data.ASIN]);
        setImageurl((imageurls) => [...imageurls, data.imageurl]);
        setCurrprice((currprices) => [...currprices, data.currprice]);
        setUsername((usernames) => [...usernames, data.username]);
        setTime((times) => [...times, data.time]);
      });
    });
  }

  getNewPost();
  getNewItems();

  return (
    <div className="feedbox" id="feedBody">
      <h1>Recent Posts!</h1>
      <ol>
        {itemnames.map((itemname, index) => (
          <li key={itemname}>
            <div className="PostItem">
              <div className="PostGrid">
                <img
                  className={"product-image"}
                  src={imageurls[index]}
                  alt="product"
                />
                <div className={"other-information"}>
                  <h4>{itemnames[index]}</h4>
                  <h4>Current price:{currprices[index]}</h4>
                  <h4>
                    Posted by:{" "}
                    <ProfileButton
                      activeOnlyWhenExact={true}
                      to={"/profile/" + usernames[index]}
                      label={usernames[index]}
                      username={usernames[index]}
                    />{" "}
                    on {times[index]}
                  </h4>
                  <DetailedViewButton
                    activeOnlyWhenExact={true}
                    to={"/item/" + asins[index]}
                    label={"View More Details"}
                    itemname={itemnames[index]}
                    username={props.username}
                    imgurl={imageurls[index]}
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

Feed.propTypes = {
  username: PropTypes.string.isRequired,
};
