import * as React from 'react';
import Socket from './Socket';

function handleLiveFeedButton(response) {
    console.log("Button worked!");
    Socket.emit('go to live feed', {
      feed: "True"
    });
}

export default function IgnoreButton() {
  return (
      <button onClick={handleLiveFeedButton()}> Live Feed </button>
  );
}