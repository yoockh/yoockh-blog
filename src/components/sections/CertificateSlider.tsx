'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Award, X } from 'lucide-react'

// Certificate data - images from assets/certificate folder
const certificates = [
  { id: 1, name: 'Google - Crash Course on Python', image: '/assets/certificate/Coursera (Google) Crash Course on Python-1.png' },
  { id: 2, name: 'Stanford - Machine Learning', image: '/assets/certificate/Coursera Stanford Machine Learning-1.png' },
  { id: 3, name: 'Michigan - CSS3', image: '/assets/certificate/Coursera (Michigan) css3-1.png' },
  { id: 4, name: 'Michigan - HTML', image: '/assets/certificate/Coursera Michigan - HTML-1.png' },
  { id: 5, name: 'Dicoding - AI Basic', image: '/assets/certificate/Dicoding - AI Basic-1.png' },
  { id: 6, name: 'Dicoding - Backend JavaScript', image: '/assets/certificate/Dicoding - Backend Javascript Pemula-1.png' },
  { id: 7, name: 'Dicoding - Cloud & Gen AI AWS', image: '/assets/certificate/Dicoding - Cloud and Gen AI AWS-1.png' },
  { id: 8, name: 'Dicoding - Data Science MS Fabric', image: '/assets/certificate/Dicoding - Data Science dengan Microsoft Fabric-1.png' },
  { id: 9, name: 'Dicoding - JavaScript', image: '/assets/certificate/Dicoding - Javascript-1.png' },
  { id: 10, name: 'Dicoding - Python', image: '/assets/certificate/Dicoding Python-1.png' },
  { id: 11, name: 'Dicoding - Machine Learning', image: '/assets/certificate/Dicoding machine-learning-1.png' },
  { id: 12, name: 'HackerRank - JavaScript', image: '/assets/certificate/HackerRank javascript_basic certificate-1.png' },
  { id: 13, name: 'HackerRank - SQL', image: '/assets/certificate/HackerRank sql_basic certificate-1.png' },
  { id: 14, name: 'Hacktiv8 - React', image: '/assets/certificate/Hacktiv8 - 1 Jam Belajar React-1.png' },
  { id: 15, name: 'Hacktiv8 - Data Classification', image: '/assets/certificate/Hacktiv8 - Data Classification and Summarization-1.png' },
  { id: 16, name: 'IBM - Data Classification Badge', image: '/assets/certificate/IBM Badge Data Classification and Summarization-1.png' },
  { id: 17, name: 'IBM - Data Classification', image: '/assets/certificate/IBM Data Classification and Summarization-1.png' },
  { id: 18, name: 'IBM - Data Classifying', image: '/assets/certificate/IBM Data Classifying-1.png' },
  { id: 19, name: 'IBM - Data Summarizing', image: '/assets/certificate/IBM Data Summarizing-1.png' },
  { id: 20, name: 'Kaggle - Intro to Programming', image: '/assets/certificate/Kaggle intro-to-programming.png' },
  { id: 21, name: 'LinkedIn - SQL Programming', image: '/assets/certificate/Linkedin_Learning SQL Programming-1.png' },
  { id: 22, name: 'RevoU - Software Engineering', image: '/assets/certificate/RevoU - Fundamental Software Engineering-1.png' },
  { id: 23, name: 'MongoDB - Document Model', image: '/assets/certificate/mongodb badge From Relational Model (SQL) to MongoDB_s_Document Model-1.png' },
  { id: 24, name: 'MySkill - WordPress', image: '/assets/certificate/Aisiya Qutwatunnada - e-Certif Short Class MySkill Wordpress Introduction-1.png' },
]

interface SelectedCert {
  name: string
  image: string
}

export default function CertificateSlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCert, setSelectedCert] = useState<SelectedCert | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // For infinite scroll effect, we duplicate the certificates
  const duplicatedCertificates = [...certificates, ...certificates]

  return (
    <section id="certificates" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-cyber-purple" />
            <span className="text-cyber-purple font-mono text-sm">Achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Certifications &</span>
            <span className="text-gradient"> Awards</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            {"// Continuous learning and professional development"}
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 py-4"
          style={{
            width: 'max-content',
          }}
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: isPaused ? 0 : [0, '-50%'],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              },
            }}
          >
            {duplicatedCertificates.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="group relative flex-shrink-0 w-72 md:w-80 cursor-pointer"
                onClick={() => setSelectedCert({ name: cert.name, image: cert.image })}
              >
                <div className="glass-card p-3 border border-white/5 hover:border-cyber-purple/30 transition-all duration-300 hover-lift">
                  {/* Certificate Image Container */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-void-light">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover overlay - subtle glow effect */}
                    <div className="absolute inset-0 bg-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Certificate Info */}
                  <div className="mt-3 px-1">
                    <h4 className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                      {cert.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pause indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isPaused ? 1 : 0 }}
        className="text-center mt-4"
      >
        <span className="text-xs font-mono text-gray-500">
          ⏸ Paused - Move cursor away to resume
        </span>
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full glass-card p-4 border border-cyber-purple/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-void border border-white/20 text-white hover:border-cyber-purple/50 hover:text-cyber-purple transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-void-light">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Certificate Title */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">{selectedCert.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
