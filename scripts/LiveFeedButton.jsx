import * as React from 'react';
import Socket from './Socket';
import { useState } from "react";
import LiveFeed from './LiveFeed';

export default function LiveFeedButton(props) {
    const [clicked, setClicked] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        console.log("this is: " + props.ASIN);
        setClicked(clicked => !clicked);
    }
    
    return(
        <div className="LiveFeed">
            <button onClick={handleClick}> Live Feed </button>
            { clicked ?
                (
                <div>
                    <LiveFeed />
                </div>
                ) : (null)
            }
        </div>
        );
}