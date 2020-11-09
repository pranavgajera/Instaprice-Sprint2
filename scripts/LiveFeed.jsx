import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";

export default function PriceHistoryResults() {
    const [pricehistory, setPricehistory] = useState([]);

    useEffect(() => {
        Socket.on('price history response', (data) => {
            setPricehistory(data['pricehistory']);
        });
    }, []);

    return(
        <div>
            <h3>Price Change History For this Item</h3>
            <ul>
                {pricehistory.map((item) => (
                    <li>{item.price_date}-${item.price}</li>
                ))}
            </ul>
            <PostButton />
        </div>
        );
}