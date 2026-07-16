'use client'

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

interface Experience {
  role: string
  company: string
  period: string
  description: string
  initial: string
  logo: string
}

// Logos land later at these paths; initials render as placeholders until then.
const experiences: Experience[] = [
  {
    role: 'Backend Engineer Intern',
    company: 'Chronicle',
    period: 'Jan 2026 - Jul 2026 · Remote',
    description:
      'Resolved 22 tickets across 24 merged PRs in a live production Django/DRF codebase, contributing directly to the core-api alongside senior engineers. Reduced P99 latency on key endpoints by up to 99.99% through N+1 query elimination, proper scoping, and indexing. Traced and fixed a silent ROI fee corruption bug, delivered auto-generated ROI certificates, funeral director collaboration flow, and email bounce notification system.',
    initial: 'C',
    logo: '/assets/logos/chronicle.png',
  },
  {
    role: 'Technical Division, Jagabaya',
    company: 'Orang Siber Indonesia',
    period: 'Apr 2026 - Present · Remote',
    description:
      'Member of research and technical intelligence division at OSI, a national cyber community. Contributed to SEO content strategy, keyword research, and cybersecurity article writing.',
    initial: 'O',
    logo: '/assets/logos/osi.png',
  },
  {
    role: 'Facilitator',
    company: 'Google Skills Arcade 2026 — via Dicoding x Google Cloud',
    period: '2026 Cohort · Remote',
    description:
      'Guiding participants through Google Cloud skill badges and cloud learning paths as part of the 2026 cohort.',
    initial: 'G',
    logo: '/assets/logos/google-cloud.png',
  },
]

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Content on the LEFT — the 3D character moves to the right here */}
        <div className="w-full lg:w-1/2 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-cyber-green" />
              <span className="text-cyber-green font-mono text-sm">./career --log</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Work</span>
              <span className="text-gradient"> Experience</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              {'// Where I have been shipping code'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 border border-white/5 hover:border-cyber-green/30
                  transition-all duration-500 hover-lift"
              >
                <div className="flex items-start gap-4">
                  {/* Logo placeholder — company initial until real logos land */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyber-green/10
                      border border-cyber-green/30 flex items-center justify-center
                      font-mono font-bold text-xl text-cyber-green
                      shadow-[0_0_10px_rgba(0,255,136,0.15)]"
                  >
                    {exp.initial}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-cyber-green font-medium text-sm">{exp.company}</p>
                    <p className="text-gray-500 font-mono text-xs mt-1">{exp.period}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mt-3">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
