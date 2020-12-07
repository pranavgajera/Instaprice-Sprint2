import * as React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Socket from "./Socket";

// export default function ProfileButton({ label}) {
//   let match = useRouteMatch({
//     path: props.to,
//     exact: props.activeOnlyWhenExact
//   });

//   function handleClick(e) {
//     e.preventDefault();
//     console.log("Linkg worked with: " + props.to);
//     Socket.emit('get profile page', {
//       username: props.username
//     });
//   }

//   return (
//     <div className={match ? "active" : ""}>
//       {match && "> "}
//       <Link to={props.to} onClick={handleClick}>{props.label}</Link>
//     </div>
//   );
// }

export default function ProfileButton({
  label,
  to,
  activeOnlyWhenExact,
  username,
}) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  function handleClick() {
    console.log("Link worked with: " + to);
    Socket.emit("get profile page", {
      username: username,
    });
  }

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to} onClick={handleClick}>
        {label}
      </Link>
    </div>
  );
}
