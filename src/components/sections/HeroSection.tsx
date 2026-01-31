'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Coffee } from 'lucide-react'

const techStack = ['Golang', 'Python', 'Django', 'Docker', 'GCP Enthusiast']

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [currentTechIndex, setCurrentTechIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // Terminal typing effect
  useEffect(() => {
    const currentTech = techStack[currentTechIndex]
    
    if (isTyping) {
      if (displayText.length < currentTech.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTech.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setCurrentTechIndex((prev) => (prev + 1) % techStack.length)
        setIsTyping(true)
      }
    }
  }, [displayText, currentTechIndex, isTyping])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            Hi, I'm
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient">
            Aisiya Qutwatunnada
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300">
            Backend <span className="text-cyber-blue">Engineer</span>
          </h2>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="glass-card overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 text-xs text-gray-500 font-mono">yoockh@portfolio:~</span>
            </div>
            
            {/* Terminal content */}
            <div className="px-6 py-4 font-mono text-left">
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-cyber-green">❯</span>
                <span className="text-gray-400">skills.display()</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-cyber-purple">→</span>
                <span className="text-cyber-blue text-lg md:text-xl font-semibold">
                  {displayText}
                </span>
                <span 
                  className={`inline-block w-3 h-6 bg-cyber-green ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transition: 'opacity 0.1s' }}
                />
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  {techStack.map((tech, index) => (
                    <span 
                      key={tech}
                      className={`px-2 py-1 rounded border transition-all duration-300 ${
                        index === currentTechIndex 
                          ? 'border-cyber-blue/50 bg-cyber-blue/10 text-cyber-blue' 
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyber-blue" />
            <span className="text-sm">Indonesia</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-cyber-orange" />
            <span className="text-sm">Coffee-Driven Development</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-xl bg-cyber-blue text-void font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-white/20 text-white font-semibold hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
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
