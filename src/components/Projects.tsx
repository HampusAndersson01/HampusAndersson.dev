'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, setDoc, doc, Timestamp, getDoc } from 'firebase/firestore';

interface Project {
  title: string;
  description?: string;
  languages: string[];
  githubLink: string;
  demoLink?: string;
  image?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const blacklistedRepos = ["CV", "HampusAndersson01", "HampusPortfolio", "Prog1_Slutarbete"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(firestore, "projects");
        const metadataDoc = doc(firestore, "metadata", "lastUpdated");

        // Check the last updated timestamp
        const lastUpdatedDoc = await getDoc(metadataDoc);
        const lastUpdated = lastUpdatedDoc.exists() ? lastUpdatedDoc.data()?.timestamp.toDate() : null;
        const now = new Date();

        if (lastUpdated && (now.getTime() - lastUpdated.getTime()) < 24 * 60 * 60 * 1000) {
          // Use cached data if within 24 hours
          const projectsSnapshot = await getDocs(projectsCollection);
          const cachedProjects = projectsSnapshot.docs.map(doc => doc.data() as Project);
          if (cachedProjects.length > 0) {
            console.log("Using cached projects");
            console.log("Cached projects found:", cachedProjects);
            setProjects(cachedProjects);
            setLoading(false); // Set loading to false
            return;
          }
        }

        // Fetch public repositories from GitHub
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API_URL}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const githubData = await response.json();

        if (!Array.isArray(githubData)) throw new Error("Unexpected GitHub API response format");

        // Fetch languages and check for demo.png for each repository
        const fetchRepoDetails = async (repo: any) => {
          const languagesResponse = await fetch(repo.languages_url);
          if (!languagesResponse.ok) throw new Error(`GitHub API error: ${languagesResponse.status}`);
          const languagesData = await languagesResponse.json();
          const languages = Object.keys(languagesData);

          const contentsResponse = await fetch(`${repo.url}/contents`);
          if (!contentsResponse.ok) throw new Error(`GitHub API error: ${contentsResponse.status}`);
          const contentsData = await contentsResponse.json();
          const demoImage = contentsData.find((file: any) => file.name === 'demo.png');

          return {
            title: repo.name,
            description: repo.description || "",
            languages: languages.length ? languages : [""],
            githubLink: repo.html_url,
            demoLink: repo.homepage || "", // Provide a default value
            image: demoImage ? `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/demo.png` : undefined
          };
        };

        // Filter and format projects
        const filteredData = githubData.filter(repo => !blacklistedRepos.includes(repo.name));
        console.log("Filtered data:", filteredData);
        const formattedProjects: Project[] = await Promise.all(filteredData.map(fetchRepoDetails));

        // Cache projects in Firestore
        const cachePromises = formattedProjects.map(project => {
          const projectData = { ...project };
          if (projectData.image === undefined) {
            delete projectData.image;
          }
          return setDoc(doc(projectsCollection, project.title), projectData);
        });
        await Promise.all(cachePromises);

        // Update the last updated timestamp
        await setDoc(metadataDoc, { timestamp: Timestamp.now() });

        // Update state
        setProjects(formattedProjects);
        console.log("Formatted projects:", formattedProjects); // Add this line
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProjects();
  }, []); // Use an empty dependency array to fetch projects only once on page load

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
      {loading ? ( // Display loading message or spinner
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap mt-4">
                    {project.languages.map((language, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2 mb-2">
                        {language}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline mr-4">
                      GitHub
                    </a>
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No projects found.</p>
          )}
        </div>
      )}
    </motion.section>
  );
}

