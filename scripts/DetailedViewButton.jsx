import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import DetailedItem from './DetailedItem';

export default function DetailedViewButton(props) {
  const [clicked, setClicked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setClicked((clicked) => !clicked);
    if (!clicked) {
      Socket.emit('detail view request', {
        title: props.itemname
      });
    }
  }

  return (
    <div>
    <button type="button" onClick={handleClick}> View Details </button>
    { clicked
        ? (
          <div>
            <DetailedItem
            />
          </div>
        ) : (null)}
        </div>
  );
}
