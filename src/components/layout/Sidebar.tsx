'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Terminal,
  ChevronRight
} from 'lucide-react'
import clsx from 'clsx'

// Custom Icons untuk Kaggle dan TikTok
const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.28.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.076.339"/>
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

// Pinterest Icon
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
)

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home', href: '#home' },
  { id: 'experience', icon: <Briefcase className="w-5 h-5" />, label: 'Experience', href: '#experience' },
  { id: 'education', icon: <GraduationCap className="w-5 h-5" />, label: 'Education', href: '#education' },
  { id: 'projects', icon: <FolderGit2 className="w-5 h-5" />, label: 'Projects', href: '#projects' },
  { id: 'certificates', icon: <Award className="w-5 h-5" />, label: 'Certificates', href: '#certificates' },
  { id: 'contact', icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact' },
]

// Green-tinted monochrome treatment: gray at rest, neon green on hover —
// consistent across all socials instead of clashing brand colors.
const socialLinks: SocialLink[] = [
  { icon: <Github className="w-5 h-5" />, href: 'https://github.com/yoockh', label: 'GitHub' },
  { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/aisiya-qutwatunnada', label: 'LinkedIn' },
  { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/yoockh.dev', label: 'Instagram' },
  { icon: <KaggleIcon />, href: 'https://www.kaggle.com/aisiyaqutwatunnada', label: 'Kaggle' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@yoockh', label: 'TikTok' },
  { icon: <PinterestIcon />, href: 'https://id.pinterest.com/yooockh/', label: 'Pinterest' },
]

const socialLinkClasses = clsx(
  'p-2.5 rounded-lg transition-all duration-300 glitch-icon',
  'bg-black/40 text-gray-500',
  'border border-[rgba(0,255,136,0.2)]',
  'hover:text-cyber-green hover:border-cyber-green hover:bg-cyber-green/10',
  'hover:shadow-[0_0_12px_rgba(0,255,136,0.4)]'
)

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 16
    })
    setHoveredItem(id)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={clsx(
          'fixed left-0 top-0 h-screen z-50',
          'hidden md:flex flex-col',
          'bg-[#0d0d0d]/95 backdrop-blur-xl',
          'border-r border-cyber-green/20',
          'shadow-[4px_0_30px_rgba(0,255,136,0.08)]',
          'scanlines',
          'transition-all duration-300 ease-out',
          isExpanded ? 'w-56' : 'w-20 lg:w-24'
        )}
      >
        {/* Pulsing vertical scanline on the inner edge */}
        <div
          aria-hidden
          className="sidebar-pulse-line absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyber-green to-transparent pointer-events-none"
        />

        {/* Logo / Brand */}
        <div className="flex items-center justify-center h-20 border-b border-cyber-green/10">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-lg border-2 border-cyber-green/60 bg-black/60 flex items-center justify-center shadow-[0_0_12px_rgba(0,255,136,0.35)]">
              <Terminal className="w-5 h-5 text-cyber-green" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-cyber-green/20 blur-xl -z-10" />
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-mono font-bold text-cyber-green text-glow-green"
              >
                yoockh@dev:~$
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-8 px-3">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id
              const isHovered = hoveredItem === item.id
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={clsx(
                      'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
                      'transition-all duration-300 ease-out group',
                      isActive
                        ? 'bg-cyber-green/10 text-cyber-green'
                        : 'text-gray-400 hover:text-cyber-green hover:bg-cyber-green/5'
                    )}
                  >
                    {/* Active indicator - positioned at exact center */}
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 my-auto h-6 bg-cyber-green rounded-r-full shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Every icon gets a bordered container: dim green frame
                        at rest, bright green + glow on hover/active */}
                    <span
                      className={clsx(
                        'relative flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0',
                        'border transition-all duration-300 glitch-icon',
                        isActive || isHovered
                          ? 'border-cyber-green text-cyber-green shadow-[0_0_12px_rgba(0,255,136,0.5)] bg-cyber-green/10'
                          : 'border-[rgba(0,255,136,0.2)] bg-black/40'
                      )}
                    >
                      {item.icon}
                    </span>

                    {/* Label (visible when expanded) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-mono text-sm whitespace-nowrap"
                        >
                          {isActive ? `> ${item.label.toLowerCase()}` : item.label.toLowerCase()}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip (visible when collapsed) - uses calculated position */}
                    {!isExpanded && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="fixed px-3 py-2 bg-[#0d0d0d] border border-cyber-green/30 rounded-lg shadow-xl shadow-cyber-green/10 whitespace-nowrap z-[100]"
                        style={{
                          top: tooltipPosition.top,
                          left: tooltipPosition.left,
                          transform: 'translateY(-50%)'
                        }}
                      >
                        <span className="text-sm font-mono text-cyber-green">{`> ${item.label.toLowerCase()}`}</span>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#0d0d0d] border-l border-b border-cyber-green/30 rotate-45" />
                      </motion.div>
                    )}
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="px-3 py-6 border-t border-cyber-green/10">
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-cyber-green/60 font-mono uppercase tracking-wider mb-4 px-4"
              >
                ./connect
              </motion.p>
            )}
          </AnimatePresence>

          <div className={clsx(
            'flex gap-2',
            isExpanded ? 'flex-row flex-wrap justify-center' : 'flex-col items-center'
          )}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={socialLinkClasses}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Expand/Collapse indicator */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <div className="w-6 h-12 bg-[#0d0d0d] border border-cyber-green/20 rounded-r-full flex items-center justify-center cursor-pointer hover:bg-cyber-green/5">
            <ChevronRight className="w-4 h-4 text-cyber-green/60" />
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50',
          'md:hidden',
          'bg-[#0d0d0d]/95 backdrop-blur-xl',
          'border-t border-cyber-green/20',
          'safe-bottom'
        )}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href, item.id)}
              className={clsx(
                'relative flex flex-col items-center gap-1 p-2 rounded-xl',
                'transition-all duration-300',
                activeSection === item.id
                  ? 'text-cyber-green'
                  : 'text-gray-400'
              )}
            >
              {/* Active dot indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="absolute -top-1 w-1 h-1 bg-cyber-green rounded-full shadow-[0_0_6px_rgba(0,255,136,0.8)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <span className={clsx(
                'relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300',
                activeSection === item.id
                  ? 'border-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.4)] bg-cyber-green/10'
                  : 'border-[rgba(0,255,136,0.2)]'
              )}>
                {item.icon}
              </span>

              <span className="text-[10px] font-mono">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Social Links Bar */}
        <div className="flex items-center justify-center gap-3 py-2 border-t border-cyber-green/10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[rgba(0,255,136,0.2)] text-gray-500 hover:text-cyber-green hover:border-cyber-green transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
