import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.scss";

interface ImageData {
  label: string;
  src: string;
}

const images: ImageData[] = [
  { label: "lorem", src: "https://picsum.photos/200/300" },
  { label: "ipsum", src: "https://picsum.photos/200/300" },
  { label: "lorem2", src: "https://picsum.photos/200/300" },
  { label: "ipsum2", src: "https://picsum.photos/200/300" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="burger-toggle"
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="burger-toggle" className="burger-menu">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </label>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <div className="menu-inner">
            <ul className="menu-nav">
              <li className="menu-nav-item">
                <Link className="menu-nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="menu-nav-item">
                <Link className="menu-nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="menu-nav-item">
                <Link className="menu-nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="menu-nav-item">
                <Link className="menu-nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <div className="gallery">
              <div className="title">
                <p>Projects</p>
              </div>
              <div className="images">
                {images.map((image) => (
                  <a className="image-link" href="#" key={image.label}>
                    <div className="image" data-label={image.label}>
                      <img src={image.src} alt="" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
