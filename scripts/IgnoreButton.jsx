import * as React from 'react';
import Socket from './Socket';

function handleIgnore(response) {
    console.log("Button worked!");
    Socket.emit('ignore price history', {
      ignore: "True"
    });
}

export default function IgnoreButton() {
  return (
      <button onClick={handleIgnore}> Ignore </button>
  );
}