import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <h1 className="landing-title">Henry Food PI</h1>
      <h2 className="landing-msg">
        Find the perfect food and drink ideas for every occasion, from weeknight
        dinners to holiday feasts.
      </h2>
      <Link to="/home">
        <button className="homeBtn">Try it</button>
      </Link>
    </div>
  );
}

export default Landing;
