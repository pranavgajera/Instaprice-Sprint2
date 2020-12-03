import React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function CommentBar(props) {
  const [input, setInput] = React.useState('');

  const postComment = (e) => {
    e.preventDefault();
    Socket.emit('post comment', {
      post_id: props.postID,
      username: props.username,
      pfp: props.pfp,
      comment_text: input,
    });
    setInput('');
  };

  return (
    <form htmlFor="newitem" onSubmit={postComment} className="commentbar">
      <label htmlFor="textbox">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button onClick={postComment} variant="primary" type="submit" value="Submit">Post Comment</button>
    </form>
  );
}

CommentBar.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
};