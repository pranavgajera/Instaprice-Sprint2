import * as React from 'react';
import ResultItem from './ResultItem';

export default function SearchResults(props) {
    return (
        <div>
            {props.searchList.map((item) => (
            <ResultItem  key={ item["ASIN"] } ASIN={ item["ASIN"] } title={ item["title"] } imageUrl={ item["imageUrl"] } />))}
        </div>
    );
}