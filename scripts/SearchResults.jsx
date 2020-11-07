import * as React from 'react';
import ResultItem from './ResultItem';
import './SearchResults.css';

export default function SearchResults(props) {
    return (
        <div className="SearchResults">
            {props.searchList.map((item) => (
            <ResultItem  key={ item["ASIN"] } ASIN={ item["ASIN"] } title={ item["title"] } imageUrl={ item["imageUrl"] } />))}
        </div>
    );
}