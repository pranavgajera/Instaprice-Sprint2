import * as React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function PostButton(props) {
  function setActive(index) {
    setState({ ...state, activeObject: state.objects[index] });
  }

  return (
    <div>
      <div>
        <button type="button" onClick={closeSearchList}>X</button>
      </div>
      <div>
        {props}
      </div>
    </div>
  );
}