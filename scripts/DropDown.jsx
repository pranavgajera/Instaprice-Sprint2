import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function DropDown({ criteria, state, stateSetter }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="DropDown">
      <button onClick={() => setShowMenu(!showMenu)}>{state}</button>
      {showMenu ? (
        <div className="menu">
          {criteria.map((criterion) => (
            <button onClick={() => stateSetter(criterion)}>{criterion}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

DropDown.propTypes = {
  criteria: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  stateSetter: PropTypes.func.isRequired,
};
