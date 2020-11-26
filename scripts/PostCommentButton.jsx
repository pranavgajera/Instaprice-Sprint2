import * as React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function PostButton(props) {
  function handlePost(e) {
    e.preventDefault();
    // console.log(`Button worked with: ${props.ASIN}`);
    Socket.emit('comment posted', {
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
    <button type="button" onClick={handlePost}> Comment </button>
  );
}