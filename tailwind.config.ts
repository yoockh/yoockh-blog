import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Safelist dynamic color classes used in ProjectShowcase
    'bg-cyber-blue',
    'bg-cyber-purple',
    'bg-cyber-green',
    'bg-cyber-blue/10',
    'bg-cyber-purple/10',
    'bg-cyber-green/10',
    'bg-cyber-blue/20',
    'bg-cyber-purple/20',
    'bg-cyber-green/20',
    'border-cyber-blue',
    'border-cyber-purple',
    'border-cyber-green',
    'border-cyber-blue/20',
    'border-cyber-purple/20',
    'border-cyber-green/20',
    'border-cyber-blue/30',
    'border-cyber-purple/30',
    'border-cyber-green/30',
    'border-cyber-blue/50',
    'border-cyber-purple/50',
    'border-cyber-green/50',
    'text-cyber-blue',
    'text-cyber-purple',
    'text-cyber-green',
    'hover:bg-cyber-blue/20',
    'hover:bg-cyber-purple/20',
    'hover:bg-cyber-green/20',
    'hover:border-cyber-blue/50',
    'hover:border-cyber-purple/50',
    'hover:border-cyber-green/50',
    'hover:border-cyber-blue/30',
    'hover:border-cyber-purple/30',
    'hover:border-cyber-green/30',
    'via-cyber-blue',
    'via-cyber-purple',
    'via-cyber-green',
  ],
  theme: {
    extend: {
      colors: {
        // Core Dark Theme
        'void': '#020617',
        'void-light': '#0f172a',
        'cyber': {
          blue: '#00d4ff',
          purple: '#a855f7',
          green: '#00ff88',
          orange: '#ff6b35',
          pink: '#ff0080',
        },
        // Glow effects
        'glow': {
          blue: 'rgba(0, 212, 255, 0.5)',
          purple: 'rgba(168, 85, 247, 0.5)',
          green: 'rgba(0, 255, 136, 0.5)',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'marquee': 'marquee 25s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            opacity: '0.8'
          },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'border-glow': {
          '0%, 100%': { 
            borderColor: 'rgba(0, 212, 255, 0.5)',
          },
          '33%': { 
            borderColor: 'rgba(168, 85, 247, 0.5)',
          },
          '66%': { 
            borderColor: 'rgba(0, 255, 136, 0.5)',
          },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}

export default config
