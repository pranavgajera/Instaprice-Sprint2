import React, { useState } from "react";
import PropTypes from "prop-types";
import Socket from "./Socket";
import CommentBar from "./CommentBar";
import ProfileButton from "./ProfileButton";

import "../style/Comment.css";
export default function CommentsSection(props) {
  const [gotComments, setGotComments] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentIDs, setCommentIDs] = useState([]);

  function updateItems(data) {
    /* Catches fetching_comments signal from backend
      Collects comment info and puts them into arrays */
    const thisPostID = props.postID;
    const updatedPostID = data.postID;
    if (thisPostID === updatedPostID) {
      setUsernames(data.allUsernames);
      setPfp(data.allPfps);
      setComments(data.allCommentTexts);
      setCommentIDs(data.allCommentIDs);
      setGotComments(true);
    } else {
      // console.log("Not my comments");
    }
  }

  function getNewComments() {
    // Recieve Update from server
    React.useEffect(() => {
      Socket.on("fetching comments", updateItems);
      return () => {
        Socket.off("fetching comments", updateItems);
      };
    });
  }
  getNewComments();

  if (gotComments) {
    return (
      <div className="comments_section" id="comments_section">
        <CommentBar
          username={props.username}
          pfp={props.pfp}
          postID={props.postID}
        />
        <ol>
          {commentIDs.map((commentID, index) => (
            <li key={commentID}>
              <img
                src={pfps[index]}
                alt="User Profile"
                className="comment_pfp"
              />
              <div className="comment_content">
                <strong>
                  <ProfileButton
                    activeOnlyWhenExact={true}
                    to={"/profile/" + usernames[index]}
                    label={usernames[index]}
                    username={usernames[index]}
                  />
                </strong>
                <span className="comment_text">{comments[index]}</span>
              </div>
              <br />
            </li>
          ))}
        </ol>
        
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

CommentsSection.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
};
