import * as React from 'react';
import ResultItem from './ResultItem';
import { useState } from "react";
import './SearchResults.css';

export default function SearchResults(props) {
    const [state, setState] = useState({
        activeObject: null,
        objects: props.searchList
    });
    
    function setActive(index) {
        setState({...state, activeObject: state.objects[index]});
    }
    
    return (
        <div>
            <button type="button" onClick={ props.closeSearchList }>X</button>
            {state.objects.map((item) => (
                <div key={ item["ASIN"] } onClick={() => {setActive(item["ASIN"])}}>
                    <ResultItem
                        ASIN={ item["ASIN"] }
                        title={ item["title"] }
                        imageUrl={ item["imageUrl"] } />
                </div>
            ))}
        </div>
    );
}