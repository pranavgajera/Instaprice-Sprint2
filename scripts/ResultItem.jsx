import * as React from 'react';
import Socket from './Socket';
import PriceHistoryResults from "./PriceHistoryResults";
import { useState } from "react";

export default function ResultItem(props) {
    const [clicked, setClicked] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        console.log("this is: " + props.ASIN);
        setClicked(clicked => !clicked);
        if (!clicked) {
            Socket.emit('price history request', {
                "ASIN": props.ASIN,
                "title": props.title,
                "imgurl": props.imageUrl
            });
        }
    }
    
    return(
        <div>
            <button onClick={handleClick}>
                <span><img src={ props.imageUrl } />{ props.title }</span>
            </button>
            { clicked ?
                (
                <div>
                    <PriceHistoryResults 
                        ASIN={props.ASIN}
                    />
                </div>
                ) : (null)
            }
        </div>
        );
}