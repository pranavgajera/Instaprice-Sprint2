import * as React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function DetailedViewButton(props) {

  function handleClick(e) {
    e.preventDefault();
    // console.log(`Button worked with: ${props.ASIN}`);
    Socket.emit('detail view request', {
      title: props.itemname
    });
  }

  return (
    <button type="button" onClick={handleClick}> View Details </button>
  );
}
