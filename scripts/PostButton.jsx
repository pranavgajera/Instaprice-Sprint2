import * as React from 'react';
import Socket from './Socket';
import {useState, useEffect} from "react";
import ResultItem from "./ResultItem";
import PriceHistoryResults from './PriceHistoryResults'

export default function PostButton(props) {
    
    function handlePost(e) {
        e.preventDefault();
        console.log("Button worked with: " + props.ASIN);
        Socket.emit('post price history', {
            ASIN: props.ASIN,
            priceHistory: props.priceHistory,
            title: props.title,
            imgurl: props.imgurl,
            user: props.user,
            time: props.time
        });
    }

  return (
      <button onClick={handlePost}> Post </button>
  );
}