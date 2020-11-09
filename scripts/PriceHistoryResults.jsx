import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";
import ResultItem from "./ResultItem";
// import PostButton from "./PostButton";
import { GoogleButton } from './GoogleButton';

export default function PriceHistoryResults() {
    const [pricehistory, setPricehistory] = useState([]);

    useEffect(() => {
        console.log("we in useeffects");

        Socket.on('price history response', (data) => {
          setPricehistory(data['pricehistory']);
        });

    }, []);
    
    function handlePost(e) {
        e.preventDefault();
        Socket.emit('post price history', {
            priceHistory: pricehistory,
            name: "temp name",
            time: "1:00 PM 1/1/2021"
        });
    }

    return(
        <div>
            <h3>Price Change History For this Item</h3>
            <ul>
                {pricehistory.map((item) => (
                    <li>{item.price_date}-${item.price}</li>
                ))}
            </ul>
            <button onClick={handlePost}> Post </button>
        </div>
        );
}