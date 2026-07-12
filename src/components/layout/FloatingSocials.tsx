'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'

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

const socialLinks = [
  { icon: <Github className="w-4 h-4" />, href: 'https://github.com/yoockh', label: 'GitHub' },
  { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/aisiya-qutwatunnada', label: 'LinkedIn' },
  { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/yoockh.dev', label: 'Instagram' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@yoockh', label: 'TikTok' },
  { icon: <KaggleIcon />, href: 'https://www.kaggle.com/aisiyaqutwatunnada', label: 'Kaggle' },
  { icon: <PinterestIcon />, href: 'https://id.pinterest.com/yooockh/', label: 'Pinterest' },
]

// Independent floating pill row, fixed top-right at all times.
// Hidden on very small screens (socials repeat in the contact section).
export default function FloatingSocials() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="fixed top-6 right-6 z-50 hidden sm:flex items-center gap-2"
    >
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.label}
          className="p-2.5 rounded-full transition-all duration-300
            bg-black/60 backdrop-blur-xl text-gray-400
            border border-cyber-green/20
            shadow-[0_4px_12px_rgba(0,255,136,0.15)]
            hover:-translate-y-0.5 hover:text-cyber-green hover:border-cyber-green
            hover:bg-cyber-green/10
            hover:shadow-[0_6px_16px_rgba(0,255,136,0.35),0_0_0_2px_rgba(0,255,136,0.35)]"
        >
          {social.icon}
        </a>
      ))}
    </motion.div>
  )
}
