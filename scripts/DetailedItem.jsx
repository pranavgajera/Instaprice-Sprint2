import * as React from "react";
// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Socket from "./Socket";
import LineGraph from "./LineGraph";
import CommentsSection from "./CommentsSection";
import { Link } from "react-router-dom";
import "../style/DetailedItem.css";

export default function DetailedView(props) {
  function handleBack(e) {
    Socket.emit("go back");
  }
  console.log("DetailedView Props");
  console.log(props);
  return (
    <div>
      <Link to="/" onClick={handleBack}>
        {" "}
        Go back to searches{" "}
      </Link>{" "}
      <br />
      Historical Price: {props.pricehistory} <br />
      Visualization Graph: <br />
      <LineGraph datapts={props.datapts} dataset={props.dataset} />
      Mean: {props.mean} <br />
      Variance: {props.variance} <br />
      Historical low: ${props.min} <br />
      Historical high: ${props.max} <br />
      Posted by: {props.user} <img className="user-photo" src={props.pfp} alt={props.user} />
      Likes: {props.likes} <button type="button"> Like </button>
      <a href={"https://www.amazon.com/dp/" + props.asin}>Buy it on Amazon!</a>
      <h4>{props.postOf}</h4>
      <CommentsSection
        username={props.user}
        pfp={props.pfp}
        postID={props.postOf}
      />
    </div>
  );
}
