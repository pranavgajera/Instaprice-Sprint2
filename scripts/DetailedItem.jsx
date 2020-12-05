import React from "react";
import Socket from "./Socket";
import LineGraph from "./LineGraph";
import ProfileButton from "./ProfileButton";
import CommentsSection from "./CommentsSection";
import LikeSection from "./LikeSection";
import { Link } from "react-router-dom";
import "../style/DetailedItem.css";

export default function DetailedView(props) {
  function handleBack(e) {
    Socket.emit("go back");
  }
  return (
    <div>
      <br />
      <div className={"more-info-box"}>
        <Link to="/" onClick={handleBack}>
          {" "}
          Go back to searches{" "}
        </Link>{" "}
         <h2>{props.title}</h2>
         <img className="item_image" src={props.imgurl} alt="product" />
         <div className={"info"}>
          <div className={"leftPage"}>
            <h2>Price Changes for This Item</h2> <br />
            <ol className="priceList">
              {props.dataset.map((date, index) => (
                <li key={date}>
                  {props.dataset[index]} - ${props.datapts[index]}
                </li>
              ))}
              <li> Mean: {props.mean}</li>
              <li> Variance: {props.variance}</li>
              <li>Historical low: ${props.min}</li>
              <li>Historical high: ${props.max}</li>
               <br />
              <li>
                   Posted by: <ProfileButton  activeOnlyWhenExact={true}  to={"/profile/" + props.user}  label={props.user}   username={props.user}    />{" "}
                   <LikeSection username={props.username} postID={props.postOf} />  
              </li>
              <li>
                    <a href={"https://www.amazon.com/dp/" + props.asin}>Buy it on Amazon!</a>
              </li>
            </ol>
          </div>
          <div className={"rightPage"}>
            <h2>Visualization Graph</h2><br/>
            <LineGraph
              className="graphcanvas"
              datapts={props.datapts}
              dataset={props.dataset}
            />
          </div>
        </div>
        <CommentsSection
          username={props.username}
          pfp={props.profPic}
          postID={props.postOf}
        />
      </div>
    </div>
  );
}
