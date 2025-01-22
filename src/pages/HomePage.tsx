import { Metadata } from 'next'
import Introduction from "../components/Introduction";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from '../components/Contact'

export const metadata: Metadata = {
  title: 'Your Name - System Developer Portfolio',
  description: 'Showcasing my skills and projects as a system developer',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Introduction />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}



