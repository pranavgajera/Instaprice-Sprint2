import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import "../style/DropDown.css";

export default function DropDown({ criteria, state, stateSetter }) {
  const [showMenu, setShowMenu] = useState(false);
  
  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  
  function chooseNewFilter(criterion) {
    stateSetter(criterion);
    toggleMenu();
  }

  return (
    <div className="Sortbar">
      <div className="Sort">Sort by: </div>
      <div className="DropDown">
        {showMenu ? (
          <div className="menu">
            {criteria.map((criterion , index ) => (
              <button key={index} onClick={() => chooseNewFilter(criterion)}>{criterion}</button>
            ))}
          </div>
        ) : <button onClick={toggleMenu}>{state}</button>}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  crit: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  stateSetter: PropTypes.func.isRequired,
};
