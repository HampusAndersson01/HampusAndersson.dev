import { Link } from "react-router-dom";
import React from "react";
import NavBar from "../components/Navbar";

function AboutPage() {
  return (
    <div>
      <NavBar></NavBar>
      <h1>Welcome to the About page!</h1>
      <p>
        Check out the <Link to="/">Home</Link> page.
      </p>
    </div>
  );
}

export default AboutPage;
