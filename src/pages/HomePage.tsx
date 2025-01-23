import { Metadata } from 'next'
import { useEffect, useState } from 'react';
import Introduction from "../components/Introduction";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from '../components/Contact'

export const metadata: Metadata = {
  title: 'Your Name - System Developer Portfolio',
  description: 'Showcasing my skills and projects as a system developer',
}

export default function HomePage() {
  const sections: Array<'introduction' | 'skills' | 'projects' | 'contact'> = ['introduction', 'skills', 'projects', 'contact'];
  const sectionNames: { [key in typeof sections[number]]: string } = {
    'introduction': 'Introduction',
    'contact': 'Contact',
    'skills': 'Skills',
    'projects': 'Projects'
  };

  const getNextSection = (): typeof sections[number] | null => {
    const buffer = window.innerHeight * 0.4;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const element = document.getElementById(section);
      if (element && element.getBoundingClientRect().top > buffer) {
        return section;
      }
    }
    return sections[sections.length - 1]; // Return the last section if none are found above the buffer
  }

  const [nextSection, setNextSection] = useState<string | null>(getNextSection());

  const scrollToNextSection = () => {
    const nextSection = getNextSection();
    if (nextSection === sections[sections.length - 1]) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nextSection) {
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
    }
    setNextSection(getNextSection());
  }

  useEffect(() => {
    setNextSection(getNextSection());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNextSection(getNextSection());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
        
        {nextSection && (
          <div className="fixed bottom-4 right-4">
            <button 
              onClick={scrollToNextSection} 
              className="px-6 py-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105 animate-bounce"
            >
              {nextSection === sections[sections.length - 1] ? 'Back to Top' : `Scroll to ${sectionNames[nextSection as keyof typeof sectionNames]}`}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}



