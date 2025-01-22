'use client'

/// <reference types="react-type-animation" />

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

export default function Introduction() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <motion.h1
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-4"
      >
        Hi, I'm <span className="text-cyan-400">Hampus Andersson</span>
      </motion.h1>
      <h2 className="text-3xl mb-8">
        I'm a{' '}
        <TypeAnimation
          sequence={[
            'System Developer',
            2000,
            'Problem Solver',
            2000,
            'Tech Enthusiast',
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-cyan-400"
        />
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-xl max-w-2xl mx-auto"
      >
        Passionate about creating efficient and scalable systems. With expertise in various technologies,
        I bring innovative solutions to complex problems.
      </motion.p>
    </motion.section>
  )
}

