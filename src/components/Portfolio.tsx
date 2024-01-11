import React, { ReactElement, useEffect, useState } from "react";
import "./styles/Portfolio.css";

interface PortfolioItemProps {
  title: string;
  description?: string;
  languages: string[];
  githubLink: string;
  demoLink?: string;
  category?: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  description,
  languages,
  githubLink,
  demoLink,
}) => {
  return (
    <div className="portfolio-item">
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="portfolio-item-languages">
        {languages.map((language, index) => (
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
  );
};

interface PortfolioProps {
  projects: PortfolioItemProps[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  // Group projects by category
  const groupedProjects: { [key: string]: PortfolioItemProps[] } = {};
  projects.forEach((project) => {
    if (project.category) {
      if (groupedProjects[project.category]) {
        groupedProjects[project.category].push(project);
      } else {
        groupedProjects[project.category] = [project];
      }
    }
  });

  return (
    <div className="portfolio-container">
      {Object.entries(groupedProjects).map(
        ([category, categoryProjects], index) => (
          <div key={index} className="category-container">
            <h2 className="category-title">{category}</h2>
            <div className="category-projects">
              {categoryProjects.map((project, projectIndex) => (
                <PortfolioItem
                  key={projectIndex}
                  title={project.title}
                  description={project.description}
                  languages={project.languages}
                  githubLink={project.githubLink}
                  demoLink={project.demoLink}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Portfolio;
