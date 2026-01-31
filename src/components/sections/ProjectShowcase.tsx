'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  ExternalLink, 
  Github, 
  X, 
  Zap, 
  Database, 
  Shield, 
  Cpu,
  Server,
  GitBranch,
  Box,
  Package,
  Settings,
  Code,
  FileText,
  Clock,
  Users
} from 'lucide-react'

interface Project {
  id: string
  title: string
  shortDesc: string
  longDesc: string
  techStack: string[]
  features: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  github: string
  demo?: string
  image?: string
  color: string
}

const projects: Project[] = [
  {
    id: 'ecommerce-order',
    title: 'Distributed E-Commerce Order System',
    shortDesc: 'Modular distributed system for e-commerce with product management, orders, and payments integration',
    longDesc: 'A modular, containerized distributed system for e-commerce with product management, order processing, and payment integration using Midtrans. Built with Python/Django backend architecture, this system features separate microservices for products, orders, and payments, all coordinated through RabbitMQ and Celery for reliable async processing.',
    techStack: ['Python', 'Django', 'Celery', 'PostgreSQL', 'Docker', 'Supabase', 'Redis', 'RabbitMQ', 'Midtrans'],
    features: [
      {
        icon: <Package className="w-5 h-5" />,
        title: 'Product Management',
        description: 'Full CRUD for products with Supabase storage for product images. RESTful endpoints with proper validation and error handling.'
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Payment Integration',
        description: 'Secure payment processing via Midtrans payment gateway with webhook handling for real-time payment status updates.'
      },
      {
        icon: <Cpu className="w-5 h-5" />,
        title: 'Async Processing',
        description: 'Celery workers with RabbitMQ for async order processing, payment verification, and email notifications. Reliable task queue with retry mechanism.'
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: 'Microservices Architecture',
        description: 'Separate Docker containers for products, orders, and payments services. Each service has its own database and communicates via message queues.'
      }
    ],
    github: 'https://github.com/yoockh/Distributed-E-Commerce-Order-System',
    color: 'cyber-blue'
  },
  {
    id: 'youth-donate',
    title: 'Youth-Donate-Rise-API',
    shortDesc: 'RESTful API for a donation platform enabling users to create, manage, and donate to campaigns',
    longDesc: 'A RESTful API powering a youth-focused donation platform built with Golang and Echo framework. Features JWT authentication, campaign management with photo galleries, donation tracking, and custom error handling. Deployed on Render with PostgreSQL database.',
    techStack: ['Golang', 'Echo', 'PostgreSQL', 'JWT', 'Swagger', 'Docker', 'Render'],
    features: [
      {
        icon: <Users className="w-5 h-5" />,
        title: 'User Authentication',
        description: 'JWT-based authentication with refresh tokens, user registration, and profile management with avatar upload support.'
      },
      {
        icon: <Server className="w-5 h-5" />,
        title: 'Campaign Management',
        description: 'Full CRUD for donation campaigns with multi-image galleries. Users can create campaigns, set goals, and track progress in real-time.'
      },
      {
        icon: <Box className="w-5 h-5" />,
        title: 'Donation Processing',
        description: 'Secure donation endpoints with transaction tracking. Users can view donation history and campaigns can display donor lists.'
      },
      {
        icon: <FileText className="w-5 h-5" />,
        title: 'API Documentation',
        description: 'Comprehensive Swagger/OpenAPI documentation for all endpoints. Clean REST design following industry best practices.'
      }
    ],
    github: 'https://github.com/yoockh/Youth-Donate-Rise-API',
    color: 'cyber-purple'
  },
  {
    id: 'videogame-rental',
    title: 'Video Game Rental API',
    shortDesc: 'Backend API for video game rental management with user authentication and rental tracking',
    longDesc: 'A backend REST API for a video game rental service built with Golang and Echo framework. Implements clean architecture with repository patterns, service layers, and handlers. Features include game inventory management, user authentication, rental transactions, and return processing.',
    techStack: ['Golang', 'Echo', 'PostgreSQL', 'JWT', 'Docker', 'Swagger'],
    features: [
      {
        icon: <Database className="w-5 h-5" />,
        title: 'Game Inventory',
        description: 'Manage video game catalog with availability tracking, pricing, and detailed game information including platform and genre.'
      },
      {
        icon: <Clock className="w-5 h-5" />,
        title: 'Rental System',
        description: 'Complete rental workflow: browse available games, create rentals with due dates, process returns, and calculate late fees.'
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Auth & Authorization',
        description: 'JWT authentication with role-based access control. Admins manage inventory while users handle their own rentals.'
      },
      {
        icon: <Code className="w-5 h-5" />,
        title: 'Clean Architecture',
        description: 'Well-structured codebase following repository pattern, dependency injection, and separation of concerns for maintainability.'
      }
    ],
    github: 'https://github.com/yoockh/Video-Game-Rental-API',
    color: 'cyber-green'
  },
  {
    id: 'go-api-utils',
    title: 'Go API Utils',
    shortDesc: 'Reusable utility library for building REST APIs in Golang with common helpers and patterns',
    longDesc: 'A collection of reusable utilities and helper functions for building REST APIs in Golang. Provides standardized response formatting, pagination helpers, validation utilities, and common middleware patterns. Designed to accelerate API development by providing battle-tested, production-ready components.',
    techStack: ['Golang', 'Echo', 'Validator', 'JWT'],
    features: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: 'Response Helpers',
        description: 'Standardized JSON response formatting with consistent error structures, success responses, and HTTP status code handling.'
      },
      {
        icon: <Settings className="w-5 h-5" />,
        title: 'Pagination Utils',
        description: 'Built-in pagination helpers with page/limit params, total count, and metadata. Works seamlessly with SQL queries.'
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Validation Helpers',
        description: 'Request validation utilities with custom error messages, field-level validation, and integration with go-validator.'
      },
      {
        icon: <GitBranch className="w-5 h-5" />,
        title: 'Middleware Patterns',
        description: 'Common middleware implementations: JWT auth, request logging, CORS handling, rate limiting, and error recovery.'
      }
    ],
    github: 'https://github.com/yoockh/go-api-utils',
    color: 'cyber-blue'
  }
]

function ProjectCard({ project, onDetailClick }: { project: Project, onDetailClick: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className={`
        relative glass-card p-6 md:p-8
        border border-white/5 hover:border-${project.color}/30
        transition-all duration-500
        hover-lift
      `}>
        {/* Gradient accent */}
        <div className={`
          absolute top-0 left-0 right-0 h-1 
          bg-gradient-to-r from-transparent via-${project.color} to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `} />

        {/* Project Icon/Placeholder */}
        <div className={`
          w-12 h-12 rounded-xl mb-6
          bg-${project.color}/10 border border-${project.color}/20
          flex items-center justify-center
          group-hover:scale-110 transition-transform duration-300
        `}>
          <Github className={`w-6 h-6 text-${project.color}`} />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-400 mb-6 line-clamp-2">
          {project.shortDesc}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-${project.color}/10 border border-${project.color}/30
              text-${project.color} font-medium text-sm
              hover:bg-${project.color}/20 hover:border-${project.color}/50
              transition-all duration-300
            `}
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
          <button
            onClick={onDetailClick}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-white/5 border border-white/10
              text-white font-medium text-sm
              hover:bg-white/10 hover:border-white/20
              transition-all duration-300
            `}
          >
            <ExternalLink className="w-4 h-4" />
            Detail
          </button>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
          <div className={`
            absolute bottom-4 right-4 w-2 h-2 rounded-full
            bg-${project.color} opacity-20 group-hover:opacity-50
            transition-opacity duration-300
          `} />
          <div className={`
            absolute bottom-4 right-8 w-1 h-1 rounded-full
            bg-${project.color} opacity-10 group-hover:opacity-30
            transition-opacity duration-300
          `} />
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className={`
                relative w-full max-w-4xl
                bg-void-light/90 backdrop-blur-xl
                border border-white/10 rounded-2xl
                shadow-2xl shadow-black/50
                overflow-hidden
              `}>
                {/* Header gradient line */}
                <div className={`h-1 bg-gradient-to-r from-transparent via-${project.color} to-transparent`} />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Content */}
                <div className="p-6 md:p-10">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4 pr-10">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {project.longDesc}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className={`px-4 py-2 rounded-lg bg-${project.color}/10 border border-${project.color}/20 text-${project.color} font-mono text-sm`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-${project.color}/10 flex items-center justify-center mb-3 text-${project.color}`}>
                            {feature.icon}
                          </div>
                          <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-blue text-void font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDetailClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-12">
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
            <span className="text-white">Featured</span>
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            {"// Production-ready applications I've built"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDetailClick={() => handleDetailClick(project)}
            />
          ))}
        </div>

        {/* Modal */}
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
        />
      </div>
    </section>
  )
}
