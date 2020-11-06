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
        <div>
            
            <button onClick={handleClick}>
                
                <span><img src={ props.imageUrl } />{ props.imageUrl }{ props.title }</span>
            </button>
        </div>
        );
}