import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";
import ResultItem from "./ResultItem";

export default function PriceHistoryResults() {
    const [pricehistory, setPricehistory] = useState([]);

    useEffect(() => {
        console.log("we in useeffects")

        Socket.on('price history response', (data) => {
          setPricehistory(data['pricehistory']);
        });

    }, []);

    return(
        <div>
            <ul>
                {pricehistory.map((item) => (
                    <li>{item.price}</li>
                ))}
            </ul>

        </div>
        );
}