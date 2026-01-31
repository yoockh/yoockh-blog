'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Code2, 
  FolderGit2, 
  Award, 
  Mail,
  Github,
  Linkedin,
  Instagram,
  User,
  Terminal,
  ChevronLeft,
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
  color: string
  hoverBg: string
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home', href: '#home' },
  { id: 'about', icon: <User className="w-5 h-5" />, label: 'About', href: '#about' },
  { id: 'tech', icon: <Code2 className="w-5 h-5" />, label: 'Tech Stack', href: '#tech' },
  { id: 'projects', icon: <FolderGit2 className="w-5 h-5" />, label: 'Projects', href: '#projects' },
  { id: 'certificates', icon: <Award className="w-5 h-5" />, label: 'Certificates', href: '#certificates' },
  { id: 'contact', icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact' },
]

// Pinterest Icon
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
)

const socialLinks: SocialLink[] = [
  { 
    icon: <Github className="w-5 h-5" />, 
    href: 'https://github.com/yoockh', 
    label: 'GitHub',
    color: 'text-white',
    hoverBg: 'hover:bg-white/10'
  },
  { 
    icon: <Linkedin className="w-5 h-5" />, 
    href: 'https://www.linkedin.com/in/aisiya-qutwatunnada', 
    label: 'LinkedIn',
    color: 'text-[#0A66C2]',
    hoverBg: 'hover:bg-[#0A66C2]/10'
  },
  { 
    icon: <Instagram className="w-5 h-5" />, 
    href: 'https://www.instagram.com/yoo.chan45', 
    label: 'Instagram',
    color: 'text-[#E4405F]',
    hoverBg: 'hover:bg-[#E4405F]/10'
  },
  { 
    icon: <KaggleIcon />, 
    href: 'https://www.kaggle.com/aisiyaqutwatunnada', 
    label: 'Kaggle',
    color: 'text-[#20BEFF]',
    hoverBg: 'hover:bg-[#20BEFF]/10'
  },
  { 
    icon: <TikTokIcon />, 
    href: 'https://www.tiktok.com/@yoockh', 
    label: 'TikTok',
    color: 'text-[#ff0050]',
    hoverBg: 'hover:bg-[#ff0050]/10'
  },
  { 
    icon: <PinterestIcon />, 
    href: 'https://id.pinterest.com/yooockh/', 
    label: 'Pinterest',
    color: 'text-[#E60023]',
    hoverBg: 'hover:bg-[#E60023]/10'
  },
]

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
          'bg-void-light/80 backdrop-blur-xl',
          'border-r border-white/5',
          'transition-all duration-300 ease-out',
          isExpanded ? 'w-56' : 'w-20 lg:w-24'
        )}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-center h-20 border-b border-white/5">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-green p-[2px]">
              <div className="w-full h-full rounded-lg bg-void-light flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyber-blue" />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-cyber-blue/20 blur-xl -z-10" />
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-mono font-bold text-cyber-blue"
              >
                YOOCKH
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-8 px-3">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
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
                    'relative w-full flex items-center gap-4 px-4 py-3 rounded-xl',
                    'transition-all duration-300 ease-out group',
                    activeSection === item.id
                      ? 'bg-cyber-blue/10 text-cyber-blue'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {/* Active indicator - positioned at exact center */}
                  {(activeSection === item.id || hoveredItem === item.id) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 my-auto h-6 bg-cyber-blue rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon with glow */}
                  <span className={clsx(
                    'relative transition-all duration-300',
                    activeSection === item.id && 'text-cyber-blue',
                    hoveredItem === item.id && 'text-cyber-blue'
                  )}>
                    {item.icon}
                    {(activeSection === item.id || hoveredItem === item.id) && (
                      <span className="absolute inset-0 blur-md bg-cyber-blue/50 -z-10" />
                    )}
                  </span>

                  {/* Label (visible when expanded) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip (visible when collapsed) - uses calculated position */}
                  {!isExpanded && hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      className="fixed px-3 py-2 bg-void-light border border-white/10 rounded-lg shadow-xl whitespace-nowrap z-[100]"
                      style={{ 
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-void-light border-l border-b border-white/10 rotate-45" />
                    </motion.div>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="px-3 py-6 border-t border-white/5">
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-gray-500 uppercase tracking-wider mb-4 px-4"
              >
                Connect
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
                className={clsx(
                  'p-2.5 rounded-lg transition-all duration-300',
                  'bg-white/5 border border-white/5',
                  social.color,
                  social.hoverBg,
                  'icon-glow'
                )}
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
          <div className="w-6 h-12 bg-void-light border border-white/10 rounded-r-full flex items-center justify-center cursor-pointer hover:bg-white/5">
            <ChevronRight className="w-4 h-4 text-gray-500" />
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
          'bg-void-light/90 backdrop-blur-xl',
          'border-t border-white/10',
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
                  ? 'text-cyber-blue'
                  : 'text-gray-400'
              )}
            >
              {/* Active dot indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="absolute -top-1 w-1 h-1 bg-cyber-blue rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className={clsx(
                'relative',
                activeSection === item.id && 'icon-glow'
              )}>
                {item.icon}
              </span>
              
              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Social Links Bar */}
        <div className="flex items-center justify-center gap-4 py-2 border-t border-white/5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'p-2 rounded-lg transition-all duration-300',
                social.color,
                'icon-glow'
              )}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
