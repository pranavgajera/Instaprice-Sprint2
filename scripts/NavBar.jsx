import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import { GiPriceTag } from "react-icons/gi";

import "../style/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <img
          className={"main-picture"}
          src="https://i.imgur.com/g0upGfG.png"
          alt="InstaPrice"
        />
      </h1>
      <div class="loginButtons">
        LOGIN HERE
        <GoogleButton />
        <FacebookButton />
      </div>
    </nav>
  );
}
