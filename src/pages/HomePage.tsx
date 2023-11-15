import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import "./styles/HomePage.css";
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";

function HomePage() {
  const { isDarkMode } = useContext(DarkModeContext);

  // Sample project data
  const projects = [
    {
      title: "Personal Site",
      description: "My personal site.",
      languages: ["React", "TypeScript"],
      githubLink: "https://github.com/HampusAndersson01/PersonalSite",
    },
    {
      title: "CollabCart",
      description:
        "A collaborative shopping list made with React and Firebase.",
      languages: ["React", "TypeScript", "Firebase"],
      githubLink: "https://github.com/HampusAndersson01/CollabCart",
      demoLink: "https://www.collabcart.hampusandersson.dev/",
    },
    {
      title: "VaultCLI",
      description: "A CLI for locally storing passwords.",
      languages: ["Python"],
      githubLink: "https://github.com/HampusAndersson01/VaultCLI",
    },
  ];

  return (
    <>
      <div className={isDarkMode ? "homeContainer dark-mode" : "homeContainer"}>
        <Header />
        <Portfolio projects={projects} />
      </div>
    </>
  );
}

export default HomePage;
