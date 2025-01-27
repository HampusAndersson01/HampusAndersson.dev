import { Metadata } from "next";
import { useEffect, useState } from "react";
import Introduction from "../components/Introduction";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import headshot from "../assets/headshot.png";
import { ReactComponent as Logo } from "../assets/logo.svg";

export const metadata: Metadata = {
  title: "Hampus Andersson - System Developer Portfolio",
  description: "Showcasing my skills and projects as a system developer",
};

export default function HomePage() {
  const BUFFER_PERCENTAGE = 0.2; // 20% of viewport height
  const sections: Array<"introduction" | "contact" | "skills" | "projects"> = [
    "introduction",
    "contact",
    "skills",
    "projects",
  ];
  const sectionNames: { [key in (typeof sections)[number]]: string } = {
    introduction: "Introduction",
    contact: "Contact",
    skills: "Skills",
    projects: "Projects",
  };

  const getNextSection = (): {
    section: (typeof sections)[number] | null;
    more: boolean;
  } => {
    // Check if we're at the bottom of the page
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10
    ) {
      return { section: null, more: false };
    }

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const buffer = window.innerHeight * BUFFER_PERCENTAGE;

        if (rect.top < buffer && rect.bottom > window.innerHeight) {
          return { section, more: true };
        }
        if (rect.bottom > window.innerHeight) {
          return { section, more: false };
        }
      }
    }
    return { section: null, more: false };
  };

  const [nextSection, setNextSection] = useState<{
    section: string | null;
    more: boolean;
  }>(getNextSection());

  const scrollToNextSection = () => {
    if (nextSection.section === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (nextSection.more) {
      const currentY = window.scrollY;
      window.scrollTo({
        top: currentY + window.innerHeight * 0.8, // Scroll 80% of window height
        behavior: "smooth",
      });
    } else {
      document
        .getElementById(nextSection.section)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setNextSection(getNextSection());
  };

  useEffect(() => {
    setNextSection(getNextSection());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNextSection(getNextSection());
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="absolute top-4 left-4">
        <Logo className="w-16 h-16 filter invert" />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img
            src={headshot}
            alt="Hampus Andersson"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg object-cover"
          />
        </div>
        <div id="introduction">
          <Introduction />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>

        <div className="fixed bottom-4 right-4">
          <button
            onClick={scrollToNextSection}
            className="px-6 py-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105 animate-bounce"
          >
            {nextSection.section === null
              ? "Back to top"
              : nextSection.more
              ? "More"
              : `Scroll to ${
                  sectionNames[nextSection.section as keyof typeof sectionNames]
                }`}
          </button>
        </div>
      </div>
    </main>
  );
}
