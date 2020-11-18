import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import './SearchResults.css';

export default function SearchResults({
  username, pfp, searchList, closeSearchList,
}) {
  const [state, setState] = useState({
    activeObject: null,
    objects: searchList,
  });

  function setActive(index) {
    setState({ ...state, activeObject: state.objects[index] });
  }

  return (
    <div className="SearchResults">
      <button type="button" onClick={closeSearchList}>X</button>
      {state.objects.map((item) => (
        <div key={item.ASIN} onClick={() => { setActive(item.ASIN); }}>
          <ResultItem
            ASIN={item.ASIN}
            title={item.title}
            imageUrl={item.imageUrl}
            username={username}
            pfp={pfp}
          />
        </div>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  searchList: PropTypes.array.isRequired,
  closeSearchList: PropTypes.func.isRequired,
};
