import React, { useState, useEffect } from 'react';
import Socket from './Socket';

export default function SearchBar() {
    const [input, setInput] = useState('');
        
    const makeSearchRequest = (e) => {
        e.preventDefault();
        Socket.emit('search request', {
          'query': input,
        });
        setInput('');
    };
    
    
    return (
        <form htmlFor="newitem" onSubmit={makeSearchRequest}>
            <label htmlFor="textbox">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
            </label>
            <button onClick={makeSearchRequest} variant="primary" type="submit" value="Submit">Submit</button>
        </form>
        );
}