import React from "react";
import PropTypes from "prop-types";
import Socket from "./Socket";
import "../style/Comment.css";

export default function CommentBar(props) {
  const [input, setInput] = React.useState("");

  const postComment = (e) => {
    e.preventDefault();
    Socket.emit("post comment", {
      post_id: props.postID,
      username: props.username,
      pfp: props.pfp,
      comment_text: input,
    });
    setInput("");
  };

  return (
    <div className="commentbar">
      <form htmlFor="newitem" onSubmit={postComment}>
        <div className="commentGrid">
          <div className="input">
            <label htmlFor="textbox">
              <input
                className="inputbox"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button
              className={"submit-button"}
              onClick={postComment}
              variant="primary"
              type="submit"
              value="Submit"
            >
            Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

CommentBar.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
};
