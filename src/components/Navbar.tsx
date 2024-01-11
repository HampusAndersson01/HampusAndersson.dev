import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pages = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Portfolio",
      path: "/portfolio",
    },
  ];

  // get element from class name and simulate click
  function simulateClick() {
    const menu = document.getElementById("menu-icon");
    menu?.click();
  }

  return (
    <>
      <div className="navbar-container" id={isMenuOpen ? "open" : "closed"}>
        <UseAnimations
          onClick={() => toggleMenu()}
          animation={menu4}
          size={64}
          strokeColor="#f0f0f0"
          className="menu-icon"
          id="menu-icon"
        />
      </div>
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        {pages.map((page, index) => (
          <div className="menu-item" key={index}>
            <NavLink
              to={page.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={simulateClick}
            >
              {page.label}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}
