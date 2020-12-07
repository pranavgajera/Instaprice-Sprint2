import * as React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Socket from "./Socket";

export default function DetailedViewButton(props) {
  let match = useRouteMatch({
    path: props.to,
    exact: props.activeOnlyWhenExact,
  });

  function handleClick() {
    Socket.emit("detail view request", {
      title: props.itemname,
      username: props.username,
    });
  }

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={props.to} onClick={handleClick}>
        {props.label}
      </Link>
    </div>
  );
}
