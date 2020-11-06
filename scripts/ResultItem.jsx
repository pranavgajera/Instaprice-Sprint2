import * as React from 'react';
import Socket from './Socket';

export default function ResultItem(props) {
    
    function handleClick(e) {
        e.preventDefault();
        Socket.emit('price history request', {
            "ASIN": props.ASIN
        });
    }
  
  
    return(
        <button onClick={handleClick}>
            <span>{ props.title }</span>
        </button>
        );
}