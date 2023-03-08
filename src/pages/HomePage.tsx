import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkMode";
import "./styles/HomePage.css";
import Header from "../components/Header";

function HomePage() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className={isDarkMode ? "homeContainer dark-mode" : "homeContainer"}>
        <Header></Header>
        <p>
          Check out the <Link to="/about">About</Link> page.
        </p>
      </div>
    </>
  );
}

export default HomePage;
