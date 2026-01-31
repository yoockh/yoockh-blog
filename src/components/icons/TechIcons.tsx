// SVG Icons for Tech Stack - Clean, recognizable icons

interface IconProps {
  className?: string
}

// Golang Gopher - cute mascot
export const GolangIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      {/* Body */}
      <ellipse cx="64" cy="72" rx="40" ry="36" fill="#00ADD8"/>
      {/* Head */}
      <circle cx="64" cy="40" r="28" fill="#00ADD8"/>
      {/* Eyes */}
      <ellipse cx="52" cy="36" rx="8" ry="10" fill="#fff"/>
      <ellipse cx="76" cy="36" rx="8" ry="10" fill="#fff"/>
      <circle cx="54" cy="36" r="4" fill="#000"/>
      <circle cx="78" cy="36" r="4" fill="#000"/>
      {/* Nose */}
      <ellipse cx="64" cy="48" rx="6" ry="4" fill="#C8A26E"/>
      {/* Ears */}
      <ellipse cx="36" cy="24" rx="6" ry="8" fill="#00ADD8"/>
      <ellipse cx="92" cy="24" rx="6" ry="8" fill="#00ADD8"/>
      {/* Teeth */}
      <rect x="58" y="54" width="5" height="6" fill="#fff" rx="1"/>
      <rect x="65" y="54" width="5" height="6" fill="#fff" rx="1"/>
    </g>
  </svg>
)

// Python two snakes - interlocked properly
// Python - Two interlocking snakes (blue top-left, yellow bottom-right)
export const PythonIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <defs>
      <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366A96"/>
      </linearGradient>
      <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFC836"/>
        <stop offset="100%" stopColor="#FFD43B"/>
      </linearGradient>
    </defs>
    {/* Blue half - top left snake */}
    <path fill="url(#py-blue)" d="M49.33 62h29.34c8.5 0 15.33-6.83 15.33-15.33V22.33C94 13.83 87.17 7 78.67 7H49.33C40.83 7 34 13.83 34 22.33v9.34h30v3.66H34H19.33C10.83 35.33 4 42.17 4 50.67v24.66C4 83.83 10.83 90.67 19.33 90.67h10V75.33C29.33 66.83 36.17 62 44.67 62h4.66zM44.33 18.33c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
    {/* Yellow half - bottom right snake */}
    <path fill="url(#py-yellow)" d="M78.67 66H49.33C40.83 66 34 72.83 34 81.33v24.34c0 8.5 6.83 15.33 15.33 15.33h29.34c8.5 0 15.33-6.83 15.33-15.33v-9.34H64v-3.66h30h14.67c8.5 0 15.33-6.83 15.33-15.33V52.67c0-8.5-6.83-15.33-15.33-15.33h-10v15.33c0 8.5-6.83 13.33-15.33 13.33h-4.67zm5 51.67c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  </svg>
)

// Django - Green D logo
export const DjangoIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <rect width="128" height="128" rx="12" fill="#092E20"/>
      <path fill="#fff" d="M68 28h16v54c-8.2 1.6-14.2 2.2-20.8 2.2-19.5 0-29.7-8.8-29.7-25.6 0-16.1 11.2-26.5 28.5-26.5 2.5 0 4.2.2 6 .5V28zm0 42.1V46.2c-1.3-.4-2.4-.5-3.8-.5-8.4 0-13.2 5.2-13.2 14.4 0 8.9 4.5 13.8 12.9 13.8 1.5 0 2.7-.1 4.1-.3zM88 28h16v16H88V28zm0 22h16v34H88V50z"/>
    </g>
  </svg>
)

// Docker whale with containers
export const DockerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(4, 28) scale(0.94)">
      <path fill="#2496ED" d="M124.8 36.5c-3.5-2.4-11.5-3.3-17.7-.8-.8-5.9-4.5-11.1-11-15.5l-3.7-2.5-2.5 3.7c-3.2 4.8-4.9 11.4-4.4 17.8.3 2.5.9 7 3.5 10.9-2.5 1.4-7.4 3.4-13.9 3.3H.8c-1.4 8-.3 28.4 10 44.8 8 12.7 19.8 19.2 35.3 19.2 33.6 0 58.4-15.5 70-43.5 4.6.1 14.5-.1 19.5-9.5.4-.6.6-1 1.5-2.8l.5-1.2-2.4-1.6z"/>
      {/* Container boxes on whale */}
      <rect x="21" y="36" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="36" y="36" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="51" y="36" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="36" y="21" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="51" y="21" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="66" y="36" width="12" height="12" fill="#fff" rx="1"/>
      <rect x="51" y="6" width="12" height="12" fill="#fff" rx="1"/>
    </g>
  </svg>
)

// Google Cloud Platform - Hexagon cloud
export const GCPIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 12) scale(0.8125)">
      {/* Cloud shape */}
      <path fill="#4285F4" d="M64 20c-18.8 0-34.5 13-38.8 30.5C14.5 53.2 8 61.8 8 72c0 13.3 10.7 24 24 24h64c13.3 0 24-10.7 24-24 0-10.2-6.5-18.8-15.2-21.5C100.5 33 84.8 20 64 20z"/>
      {/* GCP colors accent */}
      <circle cx="40" cy="64" r="8" fill="#EA4335"/>
      <circle cx="64" cy="64" r="8" fill="#FBBC05"/>
      <circle cx="88" cy="64" r="8" fill="#34A853"/>
    </g>
  </svg>
)

// PostgreSQL elephant
export const PostgreSQLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 8) scale(0.8125)">
      {/* Elephant head */}
      <ellipse cx="64" cy="60" rx="48" ry="44" fill="#336791"/>
      {/* Trunk */}
      <path fill="#336791" d="M64 104c-8 0-12 20-12 20h24s-4-20-12-20z"/>
      {/* Ear */}
      <ellipse cx="32" cy="48" rx="16" ry="24" fill="#336791"/>
      <ellipse cx="32" cy="48" rx="10" ry="16" fill="#fff" opacity="0.3"/>
      {/* Eye */}
      <circle cx="56" cy="48" r="8" fill="#fff"/>
      <circle cx="58" cy="48" r="4" fill="#000"/>
      {/* Tusk */}
      <path fill="#fff" d="M76 72c4 0 8 8 16 8v-4c-6 0-10-8-16-8-4 0-4 4 0 4z"/>
    </g>
  </svg>
)

// MySQL Dolphin
export const MySQLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 16) scale(0.875)">
      {/* Dolphin body */}
      <path fill="#00758F" d="M100 32c-20-16-50-8-64 16-10 18-8 40 8 52 16 12 44 8 60-8 12-12 16-28 12-44-4-8-8-12-16-16z"/>
      {/* Dolphin belly */}
      <path fill="#F29111" d="M48 68c8 8 24 12 36 4 8-4 12-12 12-20-8 12-28 20-48 16z"/>
      {/* Eye */}
      <circle cx="76" cy="44" r="4" fill="#fff"/>
      <circle cx="77" cy="44" r="2" fill="#000"/>
      {/* Fin */}
      <path fill="#00758F" d="M40 44c-8-12-16-20-24-20 8 4 16 16 24 28l4-4-4-4z"/>
      {/* Tail */}
      <path fill="#00758F" d="M104 52c8-4 16-4 20 0-4-8-12-8-20-4v4z"/>
    </g>
  </svg>
)

// MongoDB Leaf
export const MongoDBIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(32, 8) scale(0.5)">
      {/* Leaf shape */}
      <path fill="#00ED64" d="M64 0C48 24 32 48 32 80c0 32 14.3 48 32 48s32-16 32-48C96 48 80 24 64 0z"/>
      {/* Center vein */}
      <path fill="#004D25" d="M64 24v88c0 4-2 8-4 8s-4-4-4-8V32c0-4 4-8 8-8z"/>
      {/* Stem */}
      <rect x="60" y="120" width="8" height="16" fill="#B8C4C2" rx="2"/>
    </g>
  </svg>
)

// Redis - 3 stacked layers
export const RedisIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 16) scale(0.875)">
      {/* Bottom layer */}
      <ellipse cx="56" cy="88" rx="48" ry="16" fill="#A41E11"/>
      <path fill="#D82C20" d="M8 72v16c0 8.8 21.5 16 48 16s48-7.2 48-16V72c-10.7 8.8-27.2 12-48 12S18.7 80.8 8 72z"/>
      
      {/* Middle layer */}
      <ellipse cx="56" cy="56" rx="48" ry="16" fill="#A41E11"/>
      <path fill="#D82C20" d="M8 40v16c0 8.8 21.5 16 48 16s48-7.2 48-16V40c-10.7 8.8-27.2 12-48 12S18.7 48.8 8 40z"/>
      
      {/* Top layer */}
      <ellipse cx="56" cy="24" rx="48" ry="16" fill="#D82C20"/>
      <path fill="#D82C20" d="M8 8v16c0 8.8 21.5 16 48 16s48-7.2 48-16V8c-10.7 8.8-27.2 12-48 12S18.7 16.8 8 8z"/>
      <ellipse cx="56" cy="8" rx="48" ry="8" fill="#FF4438"/>
    </g>
  </svg>
)

// Node.js - Hexagon with N
export const NodejsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 8) scale(0.8125)">
      {/* Hexagon */}
      <polygon points="64,4 116,32 116,88 64,116 12,88 12,32" fill="#339933"/>
      {/* N letter */}
      <path fill="#fff" d="M36 84V36h12l24 32V36h12v48H72L48 52v32H36z"/>
    </g>
  </svg>
)

// Next.js - Circle with N
export const NextjsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 12) scale(0.8125)">
      <circle cx="64" cy="64" r="60" fill="currentColor"/>
      <path fill="#000" d="M48 40v48h8V56l32 40h8V40h-8v32L56 40h-8z"/>
    </g>
  </svg>
)

// JavaScript - Yellow square with JS
export const JavaScriptIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 12) scale(0.8125)">
      <rect fill="#F7DF1E" width="128" height="128" rx="8"/>
      <text x="64" y="92" textAnchor="middle" fill="#000" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">JS</text>
    </g>
  </svg>
)

// HTML5 - Orange shield with 5
export const HTMLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(20, 8) scale(0.6875)">
      {/* Shield shape */}
      <path fill="#E44D26" d="M12 0l8 112 44 16 44-16 8-112H12z"/>
      <path fill="#F16529" d="M64 8v104l36-13 6-91H64z"/>
      {/* 5 text */}
      <text x="64" y="80" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">5</text>
    </g>
  </svg>
)

// CSS3 - Blue shield with 3
export const CSSIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(20, 8) scale(0.6875)">
      {/* Shield shape */}
      <path fill="#1572B6" d="M12 0l8 112 44 16 44-16 8-112H12z"/>
      <path fill="#33A9DC" d="M64 8v104l36-13 6-91H64z"/>
      {/* 3 text */}
      <text x="64" y="80" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">3</text>
    </g>
  </svg>
)

// Linux Tux Penguin
export const LinuxIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(24, 4) scale(0.625)">
      {/* Body - black */}
      <ellipse cx="64" cy="100" rx="40" ry="48" fill="#000"/>
      {/* Belly - white */}
      <ellipse cx="64" cy="108" rx="28" ry="36" fill="#fff"/>
      {/* Head */}
      <circle cx="64" cy="36" r="32" fill="#000"/>
      {/* Face - white */}
      <ellipse cx="64" cy="44" rx="20" ry="16" fill="#fff"/>
      {/* Eyes */}
      <ellipse cx="52" cy="32" rx="8" ry="10" fill="#fff"/>
      <ellipse cx="76" cy="32" rx="8" ry="10" fill="#fff"/>
      <circle cx="54" cy="34" r="4" fill="#000"/>
      <circle cx="78" cy="34" r="4" fill="#000"/>
      {/* Beak */}
      <path fill="#F5A623" d="M64 44l-8 12h16l-8-12z"/>
      <ellipse cx="64" cy="56" rx="8" ry="4" fill="#F5A623"/>
      {/* Feet */}
      <ellipse cx="44" cy="152" rx="16" ry="6" fill="#F5A623"/>
      <ellipse cx="84" cy="152" rx="16" ry="6" fill="#F5A623"/>
    </g>
  </svg>
)

export const GitIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(4, 4) scale(0.94)">
      <path fill="#F05032" d="M124.7 57.8L70.2 3.3c-3.2-3.2-8.4-3.2-11.6 0l-11.3 11.3 14.3 14.3c3.3-1.1 7.1-.3 9.7 2.3 2.6 2.6 3.5 6.5 2.3 9.8l13.8 13.8c3.3-1.1 7.2-.3 9.8 2.3 3.7 3.7 3.7 9.6 0 13.3-3.7 3.7-9.6 3.7-13.3 0-2.7-2.7-3.4-6.7-2.2-10.1L68.4 47.2v35.1c.9.4 1.7 1 2.4 1.7 3.7 3.7 3.7 9.6 0 13.3-3.7 3.7-9.6 3.7-13.3 0-3.7-3.7-3.7-9.6 0-13.3.9-.9 2-1.6 3.1-2.1V46.8c-1.1-.5-2.2-1.2-3.1-2.1-2.8-2.8-3.4-6.9-2.1-10.3L41.4 20.5 3.3 58.6c-3.2 3.2-3.2 8.4 0 11.6l54.5 54.5c3.2 3.2 8.4 3.2 11.6 0l55.3-55.3c3.2-3.2 3.2-8.4 0-11.6z"/>
    </g>
  </svg>
)

// Heroku - Purple rounded rect with H
export const HerokuIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 8) scale(0.8125)">
      <rect width="128" height="128" rx="16" fill="#430098"/>
      {/* H letter */}
      <path fill="#fff" d="M36 24v80h16V72h24v32h16V24H76v32H52V24H36z"/>
      {/* Arrow */}
      <polygon fill="#fff" points="88,88 104,72 88,56" />
    </g>
  </svg>
)

export const SupabaseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(16, 8) scale(0.75)">
      <defs>
        <linearGradient id="supabase-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3ECF8E" />
          <stop offset="100%" stopColor="#1C8656" />
        </linearGradient>
      </defs>
      <path fill="url(#supabase-grad)" d="M74.3 122.5c-2.5 3.2-7.7 1.4-7.8-2.7l-1.5-47.8h51c4.1 0 6.4 4.8 3.8 8L74.3 122.5z"/>
      <path fill="#3ECF8E" fillOpacity="0.4" d="M53.7 5.5c2.5-3.2 7.7-1.4 7.8 2.7l.7 47.8H11.5c-4.1 0-6.4-4.8-3.8-8L53.7 5.5z"/>
    </g>
  </svg>
)

// Postman - Orange circle with astronaut
export const PostmanIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(12, 12) scale(0.8125)">
      <circle cx="64" cy="64" r="60" fill="#FF6C37"/>
      {/* Astronaut helmet */}
      <circle cx="64" cy="56" r="24" fill="#fff"/>
      <circle cx="64" cy="56" r="18" fill="#FF6C37" opacity="0.3"/>
      {/* Body */}
      <path fill="#fff" d="M44 76c0 0 8 24 20 24s20-24 20-24H44z"/>
      {/* Jetpack flames */}
      <path fill="#FFD700" d="M48 88l-8 20 8-12 4 8-4-16zm32 0l8 20-8-12-4 8 4-16z"/>
      {/* Arms */}
      <path fill="#fff" d="M40 76l-12 8 4 4 12-8z"/>
      <path fill="#fff" d="M88 76l12 8-4 4-12-8z"/>
    </g>
  </svg>
)

export const BootstrapIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <defs>
        <linearGradient id="bootstrap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B5DE5" />
          <stop offset="100%" stopColor="#7952B3" />
        </linearGradient>
      </defs>
      <path fill="url(#bootstrap-grad)" d="M10.9 0C4.9 0 0 4.9 0 10.9v106.2c0 6 4.9 10.9 10.9 10.9h106.2c6 0 10.9-4.9 10.9-10.9V10.9C128 4.9 123.1 0 117.1 0H10.9z"/>
      <path fill="#FFFFFF" d="M38.8 30.1h31.8c6.8 0 12 1.8 15.5 5.3 3.5 3.6 5.3 8.2 5.3 13.9 0 3.7-.7 6.9-2.2 9.6-1.5 2.7-3.7 4.9-6.6 6.5v.2c4.1 1.2 7.2 3.4 9.4 6.6 2.2 3.2 3.3 7.3 3.3 12.2 0 4.1-.8 7.7-2.5 10.8-1.7 3.1-4 5.6-7 7.4-3 1.9-6.4 3.2-10.3 4.1-3.9.9-8 1.3-12.3 1.3H38.8V30.1zm15.8 31h12.2c4 0 7.1-.8 9.2-2.5 2.1-1.7 3.2-4.3 3.2-7.8 0-3.8-1.1-6.5-3.2-8-2.1-1.5-5.3-2.3-9.5-2.3H54.6V61.1zm0 36.9h14.6c5 0 8.7-.9 11.2-2.8 2.5-1.9 3.7-4.9 3.7-9.1 0-4-1.3-6.9-4-8.7-2.6-1.8-6.7-2.7-12.2-2.7H54.6V98z"/>
    </g>
  </svg>
)

export const CeleryIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <path fill="#67B231" d="M64 10c-29.8 0-54 24.2-54 54s24.2 54 54 54 54-24.2 54-54-24.2-54-54-54zm0 92c-21 0-38-17-38-38s17-38 38-38 38 17 38 38-17 38-38 38z"/>
      <path fill="#67B231" d="M64 34c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 44c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14z"/>
    </g>
  </svg>
)

export const EchoIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <circle cx="64" cy="64" r="56" fill="#00ADD8" fillOpacity="0.2"/>
      <text x="64" y="72" textAnchor="middle" fill="#00ADD8" fontSize="32" fontWeight="bold" fontFamily="monospace">E</text>
    </g>
  </svg>
)

export const GRPCIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <path fill="#244C5A" d="M64 10L10 40v48l54 30 54-30V40L64 10zm0 8l44 24.5v39L64 106 20 81.5v-39L64 18z"/>
      <path fill="#5AC4BE" d="M64 26L28 46v36l36 20 36-20V46L64 26zm0 8l28 15.5v23L64 88 36 72.5v-23L64 34z"/>
    </g>
  </svg>
)

export const RabbitMQIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(4, 16) scale(0.94)">
      <path fill="#FF6600" d="M119.5 43.7H96.6V20.8c0-2.1-1.7-3.8-3.8-3.8H57.2c-2.1 0-3.8 1.7-3.8 3.8v22.9H30.5c-2.1 0-3.8 1.7-3.8 3.8v68.7c0 2.1 1.7 3.8 3.8 3.8h89c2.1 0 3.8-1.7 3.8-3.8V47.5c0-2.1-1.7-3.8-3.8-3.8zm-58.5-19h28.6v19H61V24.7zm50.5 83.5H34.3v-56.5h77.2v56.5z"/>
      <rect x="42" y="59" width="19" height="19" fill="#FF6600" rx="2"/>
      <rect x="67" y="59" width="19" height="19" fill="#FF6600" rx="2"/>
      <rect x="42" y="84" width="19" height="19" fill="#FF6600" rx="2"/>
    </g>
  </svg>
)

export const MidtransIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <rect width="128" height="128" rx="16" fill="#00457C"/>
      <path fill="#FFFFFF" d="M28 50h72v8H28zm0 20h72v8H28zm0 20h48v8H28z"/>
    </g>
  </svg>
)

export const StripeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <rect width="128" height="128" rx="16" fill="#635BFF"/>
      <path fill="#FFFFFF" d="M112 64.3c0-14.7-7.1-26.3-20.7-26.3-13.7 0-21.9 11.6-21.9 26.2 0 17.3 9.8 26.1 23.8 26.1 6.8 0 12-1.6 15.9-3.8v-11.5c-3.9 2-8.4 3.2-14.1 3.2-5.6 0-10.5-2-11.1-8.8h28c.1-1 .1-3.4.1-5.1zm-28.3-5.4c0-6.5 4-9.2 7.6-9.2 3.5 0 7.3 2.7 7.3 9.2h-14.9zM51.3 38c-5.6 0-9.2 2.6-11.2 4.5l-.7-3.6H27.5v62.4l14.1-3 .1-15.1c2 1.5 5 3.6 9.9 3.6 10 0 19.1-8 19.1-25.7-.1-16.2-9.3-23.1-19.4-23.1zm-3.4 35.5c-3.3 0-5.2-1.2-6.6-2.6l-.1-20.8c1.4-1.6 3.4-2.7 6.7-2.7 5.1 0 8.6 5.7 8.6 13-.1 7.5-3.4 13.1-8.6 13.1z"/>
    </g>
  </svg>
)

export const SwaggerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className || "w-full h-full"}>
    <g transform="translate(8, 8) scale(0.875)">
      <path fill="#85EA2D" d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8z"/>
      <path fill="#173647" d="M64 15.5c-26.8 0-48.5 21.7-48.5 48.5S37.2 112.5 64 112.5 112.5 90.8 112.5 64 90.8 15.5 64 15.5zM56.8 93.2c-2 0-3.8-.8-5.2-2.2l-9.8-10.3c-2.8-2.9-2.7-7.6.2-10.4l16.3-15.6-16.3-15.6c-2.9-2.8-3-7.5-.2-10.4l9.8-10.3c1.4-1.4 3.2-2.2 5.2-2.2 2 0 3.8.8 5.2 2.2l25.3 26.5c2.9 3 2.9 7.8 0 10.8L61.9 91c-1.4 1.4-3.2 2.2-5.1 2.2z"/>
    </g>
  </svg>
)
