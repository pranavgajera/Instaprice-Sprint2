import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function LikeSection(props) {
  // Contains like counter and like button
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  function handleLike() {
    // Tells server to toggle like
    Socket.emit('Toggle_Like', {
      username: props.username,
      postID: props.postID,
      status: alreadyLiked,
    });
  }

  function updateLikes(data) {
    // Updates likes and like status if it changes
    const thisPostID = props.postID;
    const updatedPostID = data.postID;
    if (thisPostID === updatedPostID) {
      setLikes(data.likes);
      setAlreadyLiked(data.alreadyLiked);
    } else {
      // console.log("Not my post");
    }
  }

  function getNewLikes() {
    // Recieve Socket Update from server
    React.useEffect(() => {
      Socket.on('update_likes', updateLikes);
      return () => {
        Socket.off('update_likes', updateLikes);
      };
    });
  }
  getNewLikes();

  if (alreadyLiked) {
    return (
      <div>
        Likes:
        {' '}
        {likes}
        <button type="button" onClick={handleLike}> Liked! </button>
      </div>

    );
  }
  return (
    <div>
      Likes:
      {' '}
      {likes}
      <button type="button" onClick={handleLike}> Like </button>
    </div>

  );
}

LikeSection.propTypes = {
  username: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
};
