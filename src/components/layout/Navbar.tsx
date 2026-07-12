'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Terminal, Menu, X } from 'lucide-react'
import clsx from 'clsx'

// Custom Icons untuk Kaggle, TikTok dan Pinterest
const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.28.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.076.339"/>
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

const socialLinks = [
  { icon: <Github className="w-4 h-4" />, href: 'https://github.com/yoockh', label: 'GitHub' },
  { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/aisiya-qutwatunnada', label: 'LinkedIn' },
  { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/yoockh.dev', label: 'Instagram' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@yoockh', label: 'TikTok' },
  { icon: <KaggleIcon />, href: 'https://www.kaggle.com/aisiyaqutwatunnada', label: 'Kaggle' },
  { icon: <PinterestIcon />, href: 'https://id.pinterest.com/yooockh/', label: 'Pinterest' },
]

const socialLinkClasses = clsx(
  'p-2 rounded-lg transition-all duration-300',
  'text-gray-500 border border-[rgba(0,255,136,0.2)]',
  'hover:text-cyber-green hover:border-cyber-green hover:bg-cyber-green/10',
  'hover:shadow-[0_0_10px_rgba(0,255,136,0.4)]'
)

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isCompact, setIsCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-spy + compact mode once scrolled past most of the hero
  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > window.innerHeight * 0.7)
      const mid = window.innerHeight / 2
      let current = 'home'
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) current = id
      }
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        'bg-black/60 backdrop-blur-xl',
        'border-b border-cyber-green/20',
        'transition-all duration-300'
      )}
    >
      <div
        className={clsx(
          'max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4',
          'transition-all duration-300',
          isCompact ? 'h-14' : 'h-20'
        )}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <span
            className={clsx(
              'flex items-center justify-center rounded-lg flex-shrink-0',
              'border-2 border-cyber-green/60 bg-black/60 text-cyber-green',
              'shadow-[0_0_12px_rgba(0,255,136,0.35)]',
              'transition-all duration-300',
              isCompact ? 'w-8 h-8' : 'w-9 h-9'
            )}
          >
            <Terminal className={isCompact ? 'w-4 h-4' : 'w-5 h-5'} />
          </span>
          <span className="hidden sm:block font-mono font-bold text-cyber-green text-sm">
            yoockh@dev:~$
          </span>
        </button>

        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={clsx(
                  'relative px-3 py-2 font-mono text-sm transition-all duration-300',
                  isActive
                    ? 'text-cyber-green text-glow-green'
                    : 'text-gray-400 hover:text-cyber-green'
                )}
              >
                {item.label.toLowerCase()}
                {isActive && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Social icons (desktop) */}
        <div className="hidden md:flex items-center gap-1.5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              className={socialLinkClasses}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2 rounded-lg border border-[rgba(0,255,136,0.2)] text-cyber-green"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-cyber-green/10"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={clsx(
                    'text-left px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300',
                    activeSection === item.id
                      ? 'text-cyber-green bg-cyber-green/10'
                      : 'text-gray-400 hover:text-cyber-green hover:bg-cyber-green/5'
                  )}
                >
                  {activeSection === item.id ? `> ${item.label.toLowerCase()}` : item.label.toLowerCase()}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2 px-8 pb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className={socialLinkClasses}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
