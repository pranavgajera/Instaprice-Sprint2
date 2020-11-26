import React, { useState } from 'react';
import NavBar from './NavBar';

import '../style/LandingPage.css';

export default function LandingPage() {
    
  return (
    <div>
      <section className="hero-section1">
        <div className="hero1-content">
          <h1 className="hero1-title">
            WHO WE ARE
          </h1>
          <ul className="hero1-subtitle"> 
            <li> Jeffrey Kuo </li>
            <li> Jason Morgado </li>
            <li> Erik Eckenberg </li>
            <li> Pranavkumar Gajera </li>
            <li> Shuo Zhang </li>
          </ul>
          <h2 className="hero1-bio">
            We are a group of five computer science majors currently attending NJIT and we were tasked with creating a web application.
          </h2>
        </div>
      </section>
      
      <section className="hero-section2">
        <div className="hero2-content">
          <h1 className="hero2-title">
            WHAT WE MADE
          </h1>
          <ul className="hero2-subtitle"> 
            <li> APP SCREENSHOT 1 </li>
            <li> APP SCREENSHOT 2 </li>
            <li> APP SCREENSHOT 3 </li>
          </ul>
          <p className="hero2-bio">
            Although there are quite a few applications that track the price history of products, 
            we’ve found that there is a lack of social media integration with these apps, 
            we want to create a web application where users can not only look at the price history of the products they 
            want but also be able to share the search they did through the application to other users. With our platform, users have
            a unique public profile page that allow others to comment and like their posts.
          </p>
        </div>
      </section>
      
      <section className="hero-section3">
        <div className="hero3-content">
          <h1 className="hero3-title">
            WHAT WE MADE
          </h1>
          <ul className="hero3-subtitle"> 
            <li> Flask </li>
            <li> PostgreSQL </li>
            <li> Flask-Socketio </li>
            <li> React </li>
            <li> CSS </li>
            <li> OAuth </li>
            <li> Heroku </li>
          </ul>
          <p className="hero3-bio">
            Our web app is built using Flask in the backend and React/JS in the frontend, 
            tied together using Socket.io. The app features social login via Google and Facebook, and be deployed on Heroku. 
            We use several APIs to collect product data and its relative pricing data from Amazon. We are also using python libraries to 
            convert the pricing data into a graph form that allows users to more easily share this data with others on the platform.
            We allow persistent social media interaction with the use of a PostgreSQL database.
          </p>
        </div>
      </section>
      
      <section className="hero-section4">
        <div className="hero4-content">
          <h1>
            <img src="./static/instapricelogo.png" alt="InstaPrice" />
          </h1>
          <ul className="hero4-subtitle"> 
            <li> https://instaprice490.herokuapp.com/ </li>
          </ul>
          <p className="hero4-bio">
            Contact us
          </p>
        </div>
      </section>
      
    </div>
  );
}
