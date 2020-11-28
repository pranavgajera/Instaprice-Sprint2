import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import DropDown from './DropDown';

import '../style/SearchResults.css';



export default function SearchResults({
  username, pfp, searchList, closeSearchList,
}) {
  const [state, setState] = useState({
    activeObject: null,
    objects: searchList,
  });
  const [sortCriteria, setSortCriteria] = useState("Rating");
  const criteria = ["Rating", "Price", "Reviews"];

  function setActive(index) {
    setState({ ...state, activeObject: state.objects[index] });
  }
  
  function changeSortCriteria(criteria) {
    setSortCriteria(criteria);
    if(criteria == "Price")
      searchList = searchList.sort((a,b) => a.price.match(/\d+/)[0] - b.price.match(/\d+/)[0]);
    else if(criteria == "Rating")
      searchList = searchList.sort((a,b) => b.rating - a.rating);
    else if(criteria == "Reviews")
      searchList = searchList.sort((a,b) => b.totalReviews - a.totalReviews);
  }
  
  return (
    <div className="SearchResults">
      <DropDown criteria={criteria} state={sortCriteria} stateSetter={changeSortCriteria} />
      <div className="Xbutton">
        <button type="button" onClick={closeSearchList}>X</button>
      </div>
      <div className="ResultsContainer">
        {state.objects.map((item) => (
          <div key={item.ASIN} onClick={() => { setActive(item.ASIN); }}>
            <ResultItem
              ASIN={item.ASIN}
              title={item.title}
              imageUrl={item.imageUrl}
              username={username}
              pfp={pfp}
              price={item.price}
              rating={item.rating}
              totalReviews={item.totalReviews}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

SearchResults.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  searchList: PropTypes.array.isRequired,
  closeSearchList: PropTypes.func.isRequired,
};
