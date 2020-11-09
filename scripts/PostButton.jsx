import * as React from 'react';
import Socket from './Socket';

function handlePost(response) {
    console.log("Button worked!");
    React.useEffect(() => {
        Socket.on('price history request', (data) => {
            Socket.emit('post price history', {
                ASIN: data['ASIN']
            });
        });
    });
    // Socket.emit('post price history', {
    //     priceHistory: "TODO price history"
    // });
}

export default function PostButton() {
  return (
      <button onClick={handlePost}> Post </button>
  );
}