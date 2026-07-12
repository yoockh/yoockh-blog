'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ExternalLink,
  Github,
  X,
  Zap,
  Database,
  Shield,
  Cpu,
  Server,
  Box,
  Package,
  Settings,
  FileText,
  Clock,
  Users,
  BrainCircuit,
  QrCode,
  ScanText,
  Gavel,
  Webhook,
  CloudUpload,
  TestTube2,
  GitBranch,
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
  link: string
  isGithub: boolean
  color: string
}

const projects: Project[] = [
  {
    id: 'edusaku',
    title: 'Edusaku — Offline AI Learning Assistant',
    shortDesc:
      'Offline-first AI education platform powered by Google Gemma 4 running entirely on local hardware',
    longDesc:
      'Built an offline-first AI education platform for students and teachers in low-connectivity regions, powered by Google Gemma 4 running entirely on local hardware, no internet or API keys required. Engineered a full offline RAG pipeline (OCR → embeddings → local vector store → grounded inference) and a zero-config QR-based device pairing system. Submitted to the Kaggle x Google Gemma 4 Good Hackathon.',
    techStack: [
      'Node.js',
      'Express',
      'React 19',
      'React Native',
      'Ollama (Gemma 4)',
      'Tesseract.js',
      'MiniLM',
      'Vectra RAG',
      'Tailwind CSS',
    ],
    features: [
      {
        icon: <BrainCircuit className="w-5 h-5" />,
        title: 'Fully Offline AI',
        description:
          'Google Gemma 4 runs on local hardware via Ollama — no internet connection or API keys required, built for low-connectivity regions.',
      },
      {
        icon: <ScanText className="w-5 h-5" />,
        title: 'Offline RAG Pipeline',
        description:
          'End-to-end local pipeline: OCR with Tesseract.js, MiniLM embeddings, Vectra vector store, and grounded inference on-device.',
      },
      {
        icon: <QrCode className="w-5 h-5" />,
        title: 'QR Device Pairing',
        description:
          'Zero-config QR-based pairing connects student and teacher devices over the local network with no setup steps.',
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: 'Students & Teachers',
        description:
          'Dedicated flows for both students and teachers, shipped as a web app plus a React Native mobile companion.',
      },
    ],
    link: 'https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1779068817198',
    isGithub: false,
    color: 'cyber-green',
  },
  {
    id: 'ecommerce-order',
    title: 'Distributed E-Commerce Order System',
    shortDesc:
      'Modular distributed system for e-commerce with product management, orders, and payments integration',
    longDesc:
      'Modular distributed system for e-commerce with product management, orders, and payments integration. Separate services for products, orders, and payments are coordinated through the Celery async task queue with Redis as message broker, all containerized with Docker.',
    techStack: ['Python', 'Django', 'Celery', 'PostgreSQL', 'Docker', 'Supabase', 'Redis'],
    features: [
      {
        icon: <Package className="w-5 h-5" />,
        title: 'Product Management',
        description:
          'Full CRUD for products with Supabase storage for product images. RESTful endpoints with proper validation and error handling.',
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Order Processing',
        description:
          'Complete order lifecycle management with status tracking, inventory validation, and automated notifications.',
      },
      {
        icon: <Cpu className="w-5 h-5" />,
        title: 'Async Processing',
        description:
          'Celery workers with Redis as message broker for async order processing and email notifications, with a reliable retry mechanism.',
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: 'Microservices Architecture',
        description:
          'Separate Docker containers per service, each with its own database, plus Redis for caching and the task queue.',
      },
    ],
    link: 'https://github.com/yoockh/Distributed-E-Commerce-Order-System',
    isGithub: true,
    color: 'cyber-green',
  },
  {
    id: 'youth-donate',
    title: 'Youth Donate Rise API — Donation & Auction Platform',
    shortDesc:
      'Backend for a donation and auction management system with real-time bidding and payment webhooks',
    longDesc:
      'Built backend for a donation and auction management system with real-time bidding via Redis caching, automated auction winner determination, and Midtrans payment webhook handling. Deployed to GCP Cloud Run with multi-role access.',
    techStack: ['Golang', 'Echo', 'PostgreSQL', 'Redis', 'GCP Cloud Run', 'Midtrans', 'Docker'],
    features: [
      {
        icon: <Gavel className="w-5 h-5" />,
        title: 'Real-Time Bidding',
        description:
          'Auction bidding backed by Redis caching for fast reads, with automated winner determination when auctions close.',
      },
      {
        icon: <Webhook className="w-5 h-5" />,
        title: 'Payment Webhooks',
        description:
          'Midtrans payment integration with webhook handling for reliable, asynchronous payment status updates.',
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: 'Multi-Role Access',
        description:
          'Role-based access separating donors, campaign owners, and administrators across donation and auction flows.',
      },
      {
        icon: <CloudUpload className="w-5 h-5" />,
        title: 'Cloud Run Deployment',
        description:
          'Containerized with Docker and deployed to GCP Cloud Run for scalable, serverless operation.',
      },
    ],
    link: 'https://github.com/yoockh/Youth-Donate-Rise-API',
    isGithub: true,
    color: 'cyber-green',
  },
  {
    id: 'go-game-rental',
    title: 'Go Game Rental API',
    shortDesc:
      'REST API for a physical game rental platform with multi-role RBAC, JWT auth, and full payment flow',
    longDesc:
      'REST API for a physical game rental platform with multi-role RBAC, JWT auth, full booking and payment flow with Midtrans. Achieved 78.5% unit test coverage on auth handler.',
    techStack: ['Golang', 'Echo', 'PostgreSQL', 'Supabase', 'Midtrans', 'SendGrid', 'Swagger', 'Docker'],
    features: [
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Multi-Role RBAC',
        description:
          'JWT authentication with role-based access control separating admin inventory management from user rentals.',
      },
      {
        icon: <Clock className="w-5 h-5" />,
        title: 'Booking & Payment Flow',
        description:
          'Complete booking workflow with Midtrans payment integration and SendGrid transactional emails.',
      },
      {
        icon: <TestTube2 className="w-5 h-5" />,
        title: '78.5% Test Coverage',
        description:
          'Unit tests on the auth handler reaching 78.5% coverage, keeping the critical login path regression-safe.',
      },
      {
        icon: <FileText className="w-5 h-5" />,
        title: 'API Documentation',
        description:
          'Comprehensive Swagger/OpenAPI documentation for all endpoints, following clean REST design.',
      },
    ],
    link: 'https://github.com/yoockh/go-game-rental-api',
    isGithub: true,
    color: 'cyber-green',
  },
  {
    id: 'go-api-utils',
    title: 'go-api-utils — Open Source Go Utility Library',
    shortDesc:
      'Reusable open-source Go module with standardized REST API utilities for net/http and Echo',
    longDesc:
      'Published and maintained a reusable open-source Go module (5 versioned releases) providing standardized REST API utilities for both net/http and Echo, JWT auth, bcrypt, GORM helpers, RBAC middleware, pagination, and request/response wrappers. Zero-config drop-in use across projects.',
    techStack: ['Golang', 'Echo', 'net/http', 'GORM', 'JWT', 'PostgreSQL'],
    features: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: 'Dual Framework Support',
        description:
          'Standardized REST API utilities working with both net/http and Echo — request/response wrappers included.',
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Auth & RBAC Middleware',
        description:
          'JWT auth, bcrypt password hashing, and RBAC middleware ready to drop into any Go service.',
      },
      {
        icon: <Settings className="w-5 h-5" />,
        title: 'GORM & Pagination Helpers',
        description:
          'GORM helpers and pagination utilities that eliminate boilerplate across database-backed endpoints.',
      },
      {
        icon: <GitBranch className="w-5 h-5" />,
        title: '5 Versioned Releases',
        description:
          'Published and maintained as a versioned Go module with zero-config drop-in use across projects.',
      },
    ],
    link: 'https://github.com/yoockh/go-api-utils',
    isGithub: true,
    color: 'cyber-green',
  },
]

function ProjectCard({
  project,
  index,
  onDetailClick,
}: {
  project: Project
  index: number
  onDetailClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const fromRight = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromRight ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromRight ? 50 : -50 }}
      transition={{ duration: 0.5 }}
      className={`group w-full lg:w-[46%] ${fromRight ? 'lg:ml-auto' : 'lg:mr-auto'}`}
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
          {project.isGithub ? (
            <Github className={`w-6 h-6 text-${project.color}`} />
          ) : (
            <BrainCircuit className={`w-6 h-6 text-${project.color}`} />
          )}
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
            href={project.link}
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
            {project.isGithub ? (
              <>
                <Github className="w-4 h-4" />
                View Code
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                View Project
              </>
            )}
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
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-green text-void font-semibold hover:opacity-90 transition-opacity"
                    >
                      {project.isGithub ? (
                        <>
                          <Github className="w-5 h-5" />
                          View on GitHub
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-5 h-5" />
                          View Project
                        </>
                      )}
                    </a>
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

        {/* Alternating cards around the centered 3D character */}
        <div className="flex flex-col gap-8 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
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
