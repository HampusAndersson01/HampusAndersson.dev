import { Link } from "react-router-dom";
import React, { useContext } from "react";
import NavBar from "../components/Navbar";
import { DarkModeContext } from "../context/DarkMode";
import DarkModeButton from "../components/DarkModeButton";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "./styles/HomePage.css";

function HomePage() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className={isDarkMode ? "homeContainer dark-mode" : "homeContainer"}>
        <NavBar></NavBar>
        <DarkModeButton className="darkModeButton"></DarkModeButton>
        <div className="logoContainer">
          <Logo className="logo" />
          <h1>Hampus Andersson</h1>
        </div>
        <p>
          Check out the <Link to="/about">About</Link> page.
        </p>
      </div>
    </>
  );
}

export default HomePage;
