import * as React from 'react';
import Socket from './Socket';
import {useEffect, useState} from "react";
import ResultItem from "./ResultItem";
import PostButton from './PostButton';

export default function PriceHistoryResults(props) {
    const [pricehistory, setPricehistory] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log("we in useeffects");
        Socket.on('price history response', (data) => {
          if(props.ASIN == data['ASIN']) {
            setPricehistory(data['pricehistory']),
            setShow(true);
          }
        });

    }, []);

    return(
        <div>
            { show ?
                (
                <div>
                    <h3>Price Change History For this Item</h3>
                    <ul>
                        {pricehistory.map((item) => (
                            <li>{item.price_date}-${item.price}</li>
                        ))}
                    </ul>
                    <PostButton
                        ASIN={props.ASIN}
                        priceHistory={pricehistory}
                    />
                </div>
                ) : (null)
            }
        </div>
        );
}