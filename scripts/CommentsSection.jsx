import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import CommentBar from './CommentBar';

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
      Socket.on('fetching comments', updateItems);
      return () => {
        Socket.off('fetching comments', updateItems);
      };
    });
  }
  getNewComments();

  if (gotComments) {
    return (
      <div className="comments_section" id="comments_section">
        <h1>Comments Section here</h1>
        <ol>
          {commentIDs.map((commentID, index) => (
            <li key={commentID}>
              <img src={pfps[index]} alt="User Profile" className="comment_pfp" />
              <h4>
                Name:
                {usernames[index]}
              </h4>
              <h4>
                Text:
                {comments[index]}
              </h4>
              <br />
            </li>
          ))}
        </ol>
        <h1>End comments</h1>
        <CommentBar
          username={props.username}
          pfp={props.pfp}
          postID={props.postID}
        />
      </div>
    );
  }
  return (
    <h1>Loading...</h1>
  );
}

CommentsSection.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
};
