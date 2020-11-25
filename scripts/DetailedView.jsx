import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchResults({
  detailedList, closeDetailedList,
}) {
  const [state, setState] = useState({
    activeObject: null,
    objects: detailedList,
  });

  function setActive(index) {
    setState({ ...state, activeObject: state.objects[index] });
  }

  return (
    <div className="SearchResults">
      <div className="Xbutton">
        <button type="button" onClick={closeDetailedList}>X</button>
      </div>
      
    </div>
  );
}
