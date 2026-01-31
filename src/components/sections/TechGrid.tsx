'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

// React Icons - Official logos
import { 
  SiGo, 
  SiPython, 
  SiDjango, 
  SiDocker, 
  SiGooglecloud, 
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiNodedotjs,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiLinux,
  SiGit,
  SiHeroku,
  SiSupabase,
  SiPostman,
  SiBootstrap
} from 'react-icons/si'

// Dynamically import BugCrusher to avoid SSR issues with game logic
const BugCrusher = dynamic(() => import('@/components/games/BugCrusher'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center glass-card border border-white/10">
      <span className="text-gray-500 font-mono text-sm">Loading game...</span>
    </div>
  ),
})

// Tech Stack Data with react-icons
const techItems = [
  // Large items (span-2)
  { name: 'Golang', Icon: SiGo, color: 'from-[#00ADD8] to-[#00A29C]', iconColor: '#00ADD8', size: 'large' },
  { name: 'Python', Icon: SiPython, color: 'from-[#3776AB] to-[#FFD43B]', iconColor: '#3776AB', size: 'large' },
  
  // Medium items
  { name: 'Django', Icon: SiDjango, color: 'from-[#092E20] to-[#44B78B]', iconColor: '#092E20', size: 'medium' },
  { name: 'Docker', Icon: SiDocker, color: 'from-[#2496ED] to-[#0db7ed]', iconColor: '#2496ED', size: 'medium' },
  { name: 'GCP', Icon: SiGooglecloud, color: 'from-[#4285F4] to-[#EA4335]', iconColor: '#4285F4', size: 'medium' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: 'from-[#336791] to-[#4169E1]', iconColor: '#336791', size: 'medium' },
  
  // Small items
  { name: 'JavaScript', Icon: SiJavascript, color: 'from-[#F7DF1E] to-[#F0DB4F]', iconColor: '#F7DF1E', size: 'small' },
  { name: 'Node.js', Icon: SiNodedotjs, color: 'from-[#339933] to-[#43853D]', iconColor: '#339933', size: 'small' },
  { name: 'Next.js', Icon: SiNextdotjs, color: 'from-white/80 to-white/40', iconColor: '#ffffff', size: 'small' },
  { name: 'MySQL', Icon: SiMysql, color: 'from-[#4479A1] to-[#00758F]', iconColor: '#4479A1', size: 'small' },
  { name: 'MongoDB', Icon: SiMongodb, color: 'from-[#47A248] to-[#4DB33D]', iconColor: '#47A248', size: 'small' },
  { name: 'Redis', Icon: SiRedis, color: 'from-[#DC382D] to-[#FF4438]', iconColor: '#DC382D', size: 'small' },
  { name: 'Linux', Icon: SiLinux, color: 'from-[#FCC624] to-[#FFCC33]', iconColor: '#FCC624', size: 'small' },
  { name: 'Git', Icon: SiGit, color: 'from-[#F05032] to-[#F14E32]', iconColor: '#F05032', size: 'small' },
  { name: 'HTML5', Icon: SiHtml5, color: 'from-[#E34F26] to-[#F06529]', iconColor: '#E34F26', size: 'small' },
  { name: 'CSS3', Icon: SiCss3, color: 'from-[#1572B6] to-[#264DE4]', iconColor: '#1572B6', size: 'small' },
  { name: 'Heroku', Icon: SiHeroku, color: 'from-[#430098] to-[#79589F]', iconColor: '#430098', size: 'small' },
  { name: 'Supabase', Icon: SiSupabase, color: 'from-[#3ECF8E] to-[#1C8656]', iconColor: '#3ECF8E', size: 'small' },
  { name: 'Postman', Icon: SiPostman, color: 'from-[#FF6C37] to-[#FF6C37]', iconColor: '#FF6C37', size: 'small' },
  { name: 'Bootstrap', Icon: SiBootstrap, color: 'from-[#7952B3] to-[#563D7C]', iconColor: '#7952B3', size: 'small' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function TechGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tech" className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Tech</span>
            <span className="text-gradient"> Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            {"// Technologies I work with daily"}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400 }
              }}
              className={`
                relative group cursor-pointer
                ${tech.size === 'large' ? 'col-span-2 row-span-2' : ''}
                ${tech.size === 'medium' ? 'col-span-2' : ''}
              `}
            >
              <div className={`
                relative h-full min-h-[100px] ${tech.size === 'large' ? 'min-h-[200px]' : ''} ${tech.size === 'medium' ? 'min-h-[120px]' : ''}
                glass-card p-4 md:p-6
                flex flex-col items-center justify-center gap-2
                overflow-hidden
                transition-all duration-300
                border border-white/5 hover:border-white/20
              `}>
                {/* Gradient background on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${tech.color}
                  opacity-0 group-hover:opacity-10
                  transition-opacity duration-300
                `} />

                {/* Glow effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${tech.color}
                  opacity-0 group-hover:opacity-20
                  blur-xl
                  transition-opacity duration-300
                `} />

                {/* Icon */}
                <div className={`
                  ${tech.size === 'large' ? 'w-16 h-16 md:w-20 md:h-20' : ''} 
                  ${tech.size === 'medium' ? 'w-10 h-10 md:w-12 md:h-12' : ''} 
                  ${tech.size === 'small' ? 'w-8 h-8 md:w-10 md:h-10' : ''}
                  transition-transform duration-300
                  group-hover:scale-110
                  flex items-center justify-center
                `}>
                  <tech.Icon className="w-full h-full" style={{ color: tech.iconColor }} />
                </div>

                {/* Name */}
                <span className={`
                  font-mono text-xs ${tech.size === 'large' ? 'text-base md:text-lg' : ''} ${tech.size === 'medium' ? 'text-sm' : ''}
                  text-gray-300 group-hover:text-white
                  transition-colors duration-300
                  text-center
                `}>
                  {tech.name}
                </span>

                {/* Corner accent */}
                <div className={`
                  absolute top-0 right-0 w-8 h-8
                  bg-gradient-to-bl ${tech.color}
                  opacity-0 group-hover:opacity-30
                  transition-opacity duration-300
                  clip-corner
                `} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal style footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-cyber-green font-mono text-sm">
              {">"} {techItems.length} technologies loaded
            </span>
            <span className="w-2 h-4 bg-cyber-green animate-terminal-blink" />
          </div>
        </motion.div>

        {/* Bug Crusher Game Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Take a</span>
              <span className="text-gradient"> Break</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              {"// Crush some bugs while you're here"}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animated-border rounded-2xl p-1">
            <BugCrusher />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
