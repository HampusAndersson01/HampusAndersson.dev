import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/Portfolio.css";

interface PortfolioItemProps {
  title: string;
  description?: string;
  languages: string[];
  githubLink: string;
  demoLink?: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  description,
  languages,
  githubLink,
  demoLink,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`portfolio-item ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        <div className="content">
          <div className="back">
            <div className="back-content">
              {description && <p>{description}</p>}
              <div className="project-links">
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                {demoLink && (
                  <a href={demoLink} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="front">
            <h3 className="project-title">{title}</h3>
            <div className="languages">
              {languages.map((lang, index) => (
                <span key={index}>{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioProps {
  projects: PortfolioItemProps[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Portfolio</h1>
      <div className="portfolio-list">
        {projects.map((project, index) => (
          <PortfolioItem key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
