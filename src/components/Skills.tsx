'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { FaReact, FaNodeJs, FaDocker } from 'react-icons/fa'
import { SiTypescript, SiPython, SiSharp, SiDotnet, SiJavascript, SiMysql } from 'react-icons/si'
import { FaHtml5, FaCss3Alt, FaProjectDiagram, FaGitAlt, FaNetworkWired } from 'react-icons/fa'

const skills: { name: string; icon: IconType }[] = [
  // Frontend
  { name: 'React', icon: FaReact },
  { name: 'React Native', icon: FaReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  
  // Backend
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Python', icon: SiPython },
  { name: 'C#', icon: SiSharp },
  { name: '.NET', icon: SiDotnet },
  { name: 'MySQL', icon: SiMysql },
  
  // DevOps
  { name: 'Docker', icon: FaDocker },
  { name: 'Git', icon: FaGitAlt },
  { name: 'REST APIs', icon: FaNetworkWired },
  { name: 'Agile', icon: FaProjectDiagram },
]

export default function Skills() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-24"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <skill.icon className="text-6xl mb-4 text-cyan-400" />
            <span className="text-xl">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

