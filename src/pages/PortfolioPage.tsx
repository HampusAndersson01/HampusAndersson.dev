import React from "react";
import Portfolio from "../components/Portfolio";

const PortfolioPage: React.FC = () => {
  const projects = [
    {
      title: "Personal Site",
      description: "My personal site.",
      languages: ["React", "TypeScript"],
      githubLink: "https://github.com/HampusAndersson01/PersonalSite",
      category: "Web Development",
    },
    {
      title: "CollabCart",
      description:
        "A collaborative shopping list made with React and Firebase.",
      languages: ["React", "TypeScript", "Firebase"],
      githubLink: "https://github.com/HampusAndersson01/CollabCart",
      demoLink: "https://www.collabcart.hampusandersson.dev/",
      category: "Web Development",
    },
    {
      title: "VaultCLI",
      description: "A CLI for locally storing passwords.",
      languages: ["Python"],
      githubLink: "https://github.com/HampusAndersson01/VaultCLI",
      category: "CLI",
    },
    {
      title: "Quinyx iCalendar Converter",
      description:
        "Python script that fetches your work schedule from Quinyx API and generates an iCalendar (.ics) file",
      languages: ["Python"],
      githubLink:
        "https://github.com/HampusAndersson01/Quinyx-iCalendar-Converter",
      category: "CLI",
    },
    {
      title: "Explore Sverige - Daily Puzzle",
      description: "Guess the names of Swedish city/town daily!",
      languages: ["React", "TypeScript", "Firebase"],
      githubLink:
        "https://github.com/HampusAndersson01/Explore-Sverige---Daily-Puzzle",
      demoLink: "https://www.exploresverige.nmless.xyz/",
      category: "Web Development",
    },
    {
      title: "Parameter Database",
      description: "Thesis work for Volvo Trucks Technology.",
      languages: ["React", "TypeScript", "MySQL", "Node.js", "Express"],
      githubLink: "https://github.com/HampusAndersson01/Parameter-Database",
      category: "Web Development",
    },
  ];
  return (
    <div>
      <Portfolio projects={projects} />
    </div>
  );
};

export default PortfolioPage;
