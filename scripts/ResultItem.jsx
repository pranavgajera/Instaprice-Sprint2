import * as React from 'react';
import Socket from './Socket';
import PriceHistoryResults from "./PriceHistoryResults";
import { useState, useEffect } from "react";
import IgnoreButton from "./IgnoreButton";

export default function ResultItem(props) {
    const [clicked, setClicked] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        console.log("we in function");
        setClicked(true);
        Socket.emit('price history request', {
            "ASIN": props.ASIN,
        });
    }
    
    useEffect(() => {
        Socket.on('ignored', (data) => {
            setClicked(false);
            console.log(data);
        });
    });
    
    return(
        <div>
            <button onClick={handleClick}>
                <span><img src={ props.imageUrl } />{ props.title }</span>
            </button>
            { clicked ?
                (
                <div>
                    <PriceHistoryResults />
                    <IgnoreButton />
                </div>
                ) : (null)
            }
        </div>
        );
}