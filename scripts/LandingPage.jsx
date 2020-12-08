import * as React from "react";
import { SiFlask } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiSocketDotIo } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiGoogle } from "react-icons/si";
import { SiHeroku } from "react-icons/si";

import "../style/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="base">
      <section className="hero-section1">
        <div className="hero1-content">
          <h1 className="hero1-title">WHO WE ARE</h1>
          <ul className="hero1-subtitle">
            <li> Jeffrey Kuo </li>
            <li> Jason Morgado </li>
            <li> Erik Eckenberg </li>
            <li> Pranavkumar Gajera </li>
            <li> Shuo Zhang </li>
          </ul>
          <h2 className="hero1-bio">
            We are a group of five computer science majors currently attending
            NJIT and we were tasked with creating a web application.
          </h2>
        </div>
      </section>

      <section className="hero-section2">
        <div className="hero2-content">
          <h1 className="hero2-title">WHAT WE MADE</h1>
          <div className="hero2-subtitle">
            <img className="mainFeedImage"
              src="https://i.imgur.com/YCfyMRm.png"
              alt="main feed"
              height="300"
            />
            <div></div>
            <img className="detailViewImage"
              src="https://i.imgur.com/3ZEwzpZ.png"
              alt="detail view"
              height="300"
            />
          </div>
          <p className="hero2-bio">
            Although there are quite a few applications that track the price
            history of products, we’ve found that there is a lack of social
            media integration with these apps, we want to create a web
            application where users can not only look at the price history of
            the products they want but also be able to share the search they did
            through the application to other users. With our platform, users
            have a unique public profile page that allow others to comment and
            like their posts.
          </p>
        </div>
      </section>

      <section className="hero-section3">
        <div className="hero3-content">
          <h1 className="hero3-title">HOW WE DID IT</h1>
          <ul className="hero3-subtitle">
            <li>
              {" "}
              Flask <SiFlask />{" "}
            </li>
            <li>
              {" "}
              PostgreSQL <SiPostgresql />{" "}
            </li>
            <li>
              {" "}
              Flask-Socketio <SiSocketDotIo />{" "}
            </li>
            <li>
              {" "}
              React <SiReact />{" "}
            </li>
            <li>
              {" "}
              CSS <SiCss3 />{" "}
            </li>
            <li>
              {" "}
              OAuth <SiGoogle />{" "}
            </li>
            <li>
              {" "}
              Heroku <SiHeroku />{" "}
            </li>
          </ul>
          <p className="hero3-bio">
            Our web app is built using Flask in the backend and React/JS in the
            frontend, tied together using Socket.io. The app features social
            login via Google and Facebook, and be deployed on Heroku. We use
            several APIs to collect product data and its relative pricing data
            from Amazon. We are also using python libraries to convert the
            pricing data into a graph form that allows users to more easily
            share this data with others on the platform. We allow persistent
            social media interaction with the use of a PostgreSQL database.
          </p>
        </div>
      </section>

      <section className="hero-section4">
        <div className="hero4-content">
          <h1>
            <img src="./static/instapricelogo.png" alt="InstaPrice" />
          </h1>
          <ul className="hero4-subtitle">
            <li> https://instaprice-490.herokuapp.com/ </li>
          </ul>
          <p className="hero4-bio">
            Contact us <br /> Shuo Zhang -{" "}
            <a href="mailto:sz376@njit.edu">sz376@njit.edu</a>
            <br /> Erik Eckenberg -{" "}
            <a href="mailto:ete2@njit.edu">ete2@njit.edu</a>
            <br /> Jason Morgado -{" "}
            <a href="mailto:jm768@njit.edu">jm768@njit.edu</a>
            <br /> Jeffrey Kuo -{" "}
            <a href="mailto:jkk24@njit.edu">jkk24@njit.edu</a>
            <br /> Pranavkumar Gajera -{" "}
            <a href="mailto:pvg25@njit.edu">pvg25@njit.edu</a>
          </p>
        </div>
      </section>
    </div>
  );
}
