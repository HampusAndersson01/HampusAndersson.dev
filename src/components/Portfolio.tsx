import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [isExpanded, description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="portfolio-item">
      <h1>{title}</h1>
      <div className={`description-container ${isExpanded ? "expanded" : ""}`}>
        <p ref={descriptionRef} className={isExpanded ? "expanded" : ""}>{description}</p>
        {isOverflowing && (
          <button onClick={toggleExpand} className="expand-button">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
      {!isExpanded && (
        <div className="portfolio-item-details">
          <div className="portfolio-item-languages">
            {languages.filter(language => language).slice(0, 3).map((language, index) => (
              <p key={index}>{language}</p>
            ))}
          </div>
          <div className="portfolio-item-links">
            <a href={githubLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noreferrer">
                Demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface PortfolioProps {
  projects: PortfolioItemProps[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <div className="portfolio-container">
      {projects.map((project, index) => (
        <PortfolioItem
          key={index}
          title={project.title}
          description={project.description}
          languages={project.languages}
          githubLink={project.githubLink}
          demoLink={project.demoLink}
        />
      ))}
    </div>
  );
};

export default Portfolio;
