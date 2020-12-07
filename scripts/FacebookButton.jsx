import * as React from "react";
import Socket from "./Socket";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../style/Buttons.css";
import { FiFacebook } from "react-icons/fi";

function handleSubmit(response) {
  console.log(response);
  const name = response.name;
  const email = response.email;
  const profilepicture = response.picture.data.url;
  Socket.emit("new user", {
    name,
    email,
    profilepicture,
  });
}

export default function FacebookButton() {
  return (
    <div className="Main-Container">
      <FacebookLogin
        appId="801742090666243"
        autoLoad={false}
        fields="name,email,picture"
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>
            <FiFacebook class="loginButton" />
          </button>
        )}
        callback={handleSubmit}
      />
    </div>
  );
}
