'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

interface Education {
  institution: string
  program: string
  period: string
  description: string
}

const educations: Education[] = [
  {
    institution: 'Hacktiv8 Indonesia',
    program: 'Backend Golang Bootcamp',
    period: 'Aug - Dec 2025',
    description:
      'Intensive program covering REST API, PostgreSQL, Redis, Docker, and GCP deployment using Golang & Echo Framework.',
  },
  {
    institution: 'STEBI Syaikhona Kholil Pasuruan',
    program: 'Bachelor of Economics',
    period: 'Aug 2021 - Sep 2025',
    description: 'GPA 3.86/4.00, Best Graduate.',
  },
]

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-cyber-green" />
            <span className="text-cyber-green font-mono text-sm">./education --list</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Edu</span>
            <span className="text-gradient">cation</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            {'// Formal and intensive learning paths'}
          </p>
        </motion.div>

        {/* Cards left and right — the 3D character sits in the center gap */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-0">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="w-full lg:w-[32%] glass-card p-6 md:p-8 border border-white/5
                hover:border-cyber-green/30 transition-all duration-500 hover-lift"
            >
              <div
                className="w-12 h-12 rounded-xl mb-5 bg-cyber-green/10 border border-cyber-green/30
                  flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.15)]"
              >
                <GraduationCap className="w-6 h-6 text-cyber-green" />
              </div>
              <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
              <p className="text-cyber-green font-medium text-sm">{edu.program}</p>
              <p className="text-gray-500 font-mono text-xs mt-1">{edu.period}</p>
              <p className="text-gray-400 text-sm leading-relaxed mt-4">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
