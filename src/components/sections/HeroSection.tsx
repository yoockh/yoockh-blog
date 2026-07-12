'use client'

import { motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { characterState } from '@/components/three/characterState'

const techStack = [
  'Golang',
  'Python',
  'Django',
  'DRF',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'Docker',
  'GCP',
  'JavaScript/TypeScript',
]

export default function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-12 py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left: hover zone reserved for the 3D character (rendered on the
            fixed canvas behind this section). Hovering it spins the model. */}
        <div
          className="hidden md:block md:w-2/5 self-stretch min-h-[60vh] cursor-pointer"
          onMouseEnter={() => (characterState.hovered = true)}
          onMouseLeave={() => (characterState.hovered = false)}
        />

        {/* Right: content */}
        <div className="relative z-10 w-full md:w-3/5">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-cyber-green/10 border border-cyber-green/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
            </span>
            <span className="text-cyber-green text-sm font-medium">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Hi, I'm
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
              Aisiya Qutwatunnada
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
          >
            Backend Engineer who taught myself to code and never looked back.
            I like digging into gnarly bugs, building clean APIs, and shipping
            things that actually work.
          </motion.p>

          {/* Tech stack grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-4 py-2 rounded-lg font-mono text-sm text-cyber-green
                  bg-cyber-green/5 border border-cyber-green/40
                  shadow-[0_0_8px_rgba(0,255,136,0.15)]
                  hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]
                  hover:border-cyber-green hover:bg-cyber-green/10
                  transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Message button → contact */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={scrollToContact}
            aria-label="Send me a message"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl
              bg-cyber-green/10 border border-cyber-green/40 text-cyber-green
              shadow-[0_0_10px_rgba(0,255,136,0.15)]
              hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:bg-cyber-green/20
              transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm">./send_message</span>
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
