import * as React from 'react';
import {useRouteMatch, Link } from 'react-router-dom';
import Socket from './Socket';

export default function DetailedViewButton({ label, to, activeOnlyWhenExact, itemname }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  
  function handleClick(e) {
    Socket.emit('detail view request', {
      title: itemname
    });
  }

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to} onClick={handleClick}>{label}</Link>
    </div>
  );
}