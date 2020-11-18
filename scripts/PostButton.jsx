import * as React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function PostButton(props) {
  function handlePost(e) {
    e.preventDefault();
    // console.log(`Button worked with: ${props.ASIN}`);
    Socket.emit('post price history', {
      ASIN: props.ASIN,
      priceHistory: props.priceHistory,
      title: props.title,
      imgurl: props.imgurl,
      user: props.user,
      profpic: props.profpic,
      time: props.time,
    });
  }

  return (
    <button type="button" onClick={handlePost}> Post </button>
  );
}

PostButton.propTypes = {
  ASIN: PropTypes.string.isRequired,
  priceHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  imgurl: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
};
