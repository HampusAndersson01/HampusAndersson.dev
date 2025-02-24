"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { firestore } from "../firebaseConfig";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { FaSearchPlus } from "react-icons/fa";
import { getAuth, signInAnonymously } from "firebase/auth";

interface Project {
  title: string;
  description?: string;
  languages: string[];
  githubLink: string;
  demoLink?: string;
  image?: string;
}

const formatTitle = (title: string) => {
  return title
    .replace(/---/g, " - ") // Replace triple hyphens with " - "
    .replace(/--/g, " ") // Replace double hyphens with a space
    .replace(/-/g, " "); // Replace single hyphens with a space
};

const checkImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

const cacheKey = "githubProjectsCache";

const fetchFromCache = () => {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const now = new Date().getTime();
    if (now - timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
  }
  return null;
};

const saveToCache = (data: any) => {
  const now = new Date().getTime();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }));
};

const authorizedDomains = ["hampusandersson.dev", "localhost"];

const fetchProjects = async (
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void,
  setProjects: (projects: Project[]) => void,
  blacklistedRepos: string[],
  forceUpdate = false
) => {
  if (
    process.env.NODE_ENV !== "development" &&
    !authorizedDomains.includes(window.location.hostname)
  ) {
    console.error("Unauthorized domain");
    setError("Unauthorized domain");
    setLoading(false);
    return;
  }

  try {
    const cachedProjects = fetchFromCache();
    if (cachedProjects && !forceUpdate) {
      setProjects(cachedProjects);
      setLoading(false);
      return;
    }

    const projectsCollection = collection(firestore, "projects");
    const metadataDoc = doc(firestore, "metadata", "lastUpdated");

    // Check the last updated timestamp
    const lastUpdatedDoc = await getDoc(metadataDoc);
    const lastUpdated = lastUpdatedDoc.exists()
      ? lastUpdatedDoc.data()?.timestamp.toDate()
      : null;
    const now = new Date();

    if (
      !forceUpdate &&
      lastUpdated &&
      now.getTime() - lastUpdated.getTime() < 24 * 60 * 60 * 1000
    ) {
      // Use cached data if within 24 hours
      const projectsSnapshot = await getDocs(projectsCollection);
      const cachedProjects = projectsSnapshot.docs.map(
        (doc) => doc.data() as Project
      );
      if (cachedProjects.length > 0) {
        setProjects(cachedProjects);
        setLoading(false); // Set loading to false
        return;
      }
    }

    // Fetch public repositories from GitHub
    const response = await fetch(`${process.env.REACT_APP_GITHUB_API_URL}`);
    if (!response.ok)
      throw new Error(`GitHub API error: ${response.status}`);
    const githubData = await response.json();

    if (!Array.isArray(githubData))
      throw new Error("Unexpected GitHub API response format");

    // Fetch languages and check for demo.png for each repository
    const fetchRepoDetails = async (repo: any) => {
      const languagesResponse = await fetch(repo.languages_url);
      if (!languagesResponse.ok)
        throw new Error(`GitHub API error: ${languagesResponse.status}`);
      const languagesData = await languagesResponse.json();
      const languages = Object.keys(languagesData);

      const contentsResponse = await fetch(`${repo.url}/contents`);
      if (!contentsResponse.ok)
        throw new Error(`GitHub API error: ${contentsResponse.status}`);
      const contentsData = await contentsResponse.json();
      const demoImage = contentsData.find(
        (file: any) => file.name === "demo.png"
      );

      let imageUrl;
      if (demoImage) {
        // Try main branch first, then master if main fails
        const mainBranchUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/demo.png`;
        const masterBranchUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/demo.png`;

        if (await checkImageUrl(mainBranchUrl)) {
          imageUrl = mainBranchUrl;
        } else if (await checkImageUrl(masterBranchUrl)) {
          imageUrl = masterBranchUrl;
        }
      }

      return {
        title: formatTitle(repo.name),
        description: repo.description || "",
        languages: languages.length ? languages : [""],
        githubLink: repo.html_url,
        demoLink: repo.homepage || "",
        image: imageUrl,
      };
    };

    // Filter and format projects
    const filteredData = githubData.filter(
      (repo) => !blacklistedRepos.includes(repo.name)
    );
    const formattedProjects: Project[] = await Promise.all(
      filteredData.map(fetchRepoDetails)
    );

    // Cache projects in Firestore
    const cachePromises = formattedProjects.map((project) => {
      const projectData = { ...project };
      if (projectData.image === undefined) {
        delete projectData.image;
      }
      return setDoc(doc(projectsCollection, project.title), projectData);
    });
    await Promise.all(cachePromises);

    // Remove projects from Firestore that are not in the fetched data
    const projectsSnapshot = await getDocs(projectsCollection);
    const projectTitles = formattedProjects.map((project) => project.title);
    const deletePromises = projectsSnapshot.docs
      .filter((doc) => !projectTitles.includes(doc.id))
      .map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Update the last updated timestamp
    await setDoc(metadataDoc, { timestamp: Timestamp.now() });

    // Update state and cache
    setProjects(formattedProjects);
    saveToCache(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    if ((error as any).code === "permission-denied") {
      setError("You do not have permission to access the projects data.");
    } else {
      setError("Failed to load projects. Please try again later.");
    }
  } finally {
    setLoading(false); // Set loading to false
  }
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const blacklistedRepos = [
    "CV",
    "HampusAndersson01",
    "HampusPortfolio",
    "Prog1_Slutarbete",
  ];

  const handleImageClick = (image: string) => {
    setEnlargedImage(image);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  // Add console command to force update projects
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "development" &&
      window.location.hostname !== "hampusandersson.dev"
    ) {
      console.error("Unauthorized domain");
      return;
    }

    // Authenticate users anonymously
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        if (process.env.NODE_ENV === "development") {
          console.log("Signed in anonymously");
        }
      })
      .catch((error: any) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Authentication failed:", error);
        }
      });

    const projectsCollection = collection(firestore, "projects");
    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => doc.data() as Project);
      setProjects(projectsData);
      setLoading(false);
    });

    fetchProjects(setError, setLoading, setProjects, blacklistedRepos);

    if (process.env.NODE_ENV === "development") {
      (window as any).forceUpdateProjects = () =>
        fetchProjects(setError, setLoading, setProjects, blacklistedRepos, true);
      console.log(
        "Development mode: Use 'forceUpdateProjects()' in the console to force update projects."
      );
    }

    return () => unsubscribe();
  }, []); // Use an empty dependency array to fetch projects only once on page load

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 pb-0" // Update className to remove bottom padding
    >
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseEnlargedImage}
        >
          <img
            src={enlargedImage}
            alt="Enlarged demo"
            className="max-w-full max-h-full md:max-w-4/5 md:max-h-4/5"
          />
        </div>
      )}
      <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
      <p className="text-center mb-8 text-lg font-medium text-gray-300 bg-gray-800 p-4 rounded-lg shadow-md">
        Node.js, JavaScript, React, TypeScript, .NET, and more.
      </p>
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
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col relative"
              >
                {project.image && (
                  <div
                    className="relative group cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      project.image && handleImageClick(project.image);
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <FaSearchPlus className="text-white text-4xl" />
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {formatTitle(project.title)}
                  </h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    {project.languages.length > 0 &&
                      project.languages[0] !== "" && (
                        <div className="flex flex-wrap mb-4">
                          {project.languages.map((language, index) => (
                            <span
                              key={index}
                              className="bg-cyan-700 text-white px-3 py-1 rounded-full mr-2 mb-2"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      )}
                    <div className="flex space-x-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300"
                      >
                        GitHub
                      </a>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300"
                        >
                          Demo
                        </a>
                      )}
                    </div>
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
