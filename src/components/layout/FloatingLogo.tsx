'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

// Independent floating pill, fixed top-left at all times. Clicking it
// scrolls back to the top of the page.
export default function FloatingLogo() {
  const scrollHome = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={scrollHome}
      aria-label="Back to top"
      className="fixed top-6 left-6 z-50 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full
        bg-black/60 backdrop-blur-xl
        border border-cyber-green/30
        shadow-[0_4px_20px_rgba(0,255,136,0.2)]
        hover:border-cyber-green/60 hover:shadow-[0_6px_28px_rgba(0,255,136,0.35)]
        transition-all duration-300"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-cyber-green/60 bg-black/60 text-cyber-green shadow-[0_0_10px_rgba(0,255,136,0.3)]">
        <Terminal className="w-4 h-4" />
      </span>
      <span className="font-mono font-bold text-cyber-green text-sm">
        yoockh@dev:~$
      </span>
    </motion.button>
  )
}
