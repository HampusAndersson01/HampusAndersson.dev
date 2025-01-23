'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 text-center bg-gradient-to-br from-gray-800 to-gray-700 text-white"
    >
      <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
      <div className="flex justify-center space-x-8">
        <motion.a
          href="https://github.com/hampusandersson01"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/hampusandersson01"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl text-gray-300 hover:text-white transition-colors"
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href="mailto:hampe.01@hotmail.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl text-gray-300 hover:text-white transition-colors"
        >
          <FaEnvelope />
        </motion.a>
      </div>
    </motion.section>
  )
}

