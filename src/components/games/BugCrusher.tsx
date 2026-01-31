'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

// ============================================
// TYPES & INTERFACES
// ============================================
interface Bug {
  id: number
  x: number
  y: number
  text: string
  speed: number
  health: number
  maxHealth: number
  isBoss: boolean
}

interface Bullet {
  id: number
  x: number
  y: number
  text: string
}

interface Particle {
  id: number
  x: number
  y: number
  text: string
}

type GameState = 'idle' | 'playing' | 'win' | 'lose'
type Level = 'Junior' | 'Mid' | 'Senior'

// ============================================
// GAME CONFIG
// ============================================
interface LevelConfig {
  bugs: string[]
  spawnRate: number
  maxBugs: number
  winScore: number
  bugSpeed: { min: number; max: number }
  boss?: { text: string; health: number }
}

const GAME_CONFIG: Record<Level, LevelConfig> = {
  Junior: {
    bugs: ['Bug', 'Error', 'Typo', '404', 'NaN', 'null'],
    spawnRate: 2500,
    maxBugs: 3,
    winScore: 150,
    bugSpeed: { min: 0.2, max: 0.4 },
  },
  Mid: {
    bugs: ['Race Condition', 'Memory Leak', 'Deadlock', 'Timeout', 'CORS', 'SQL Injection'],
    spawnRate: 2000,
    maxBugs: 4,
    winScore: 300,
    bugSpeed: { min: 0.35, max: 0.6 },
  },
  Senior: {
    bugs: ['Kernel Panic', 'Stack Overflow', 'Heap Corruption', 'Segfault'],
    spawnRate: 1500,
    maxBugs: 5,
    winScore: 500,
    bugSpeed: { min: 0.5, max: 0.8 },
    boss: { text: 'SERVER DOWN', health: 10 },
  },
}

const AMMO_TEXTS = ['Fix', 'Refactor', 'Deploy', 'Patch', 'Hotfix', 'Debug']
const CONTAINER_WIDTH = 100 // percentage
const CONTAINER_HEIGHT = 100 // percentage
const PLAYER_WIDTH = 12 // percentage
const BULLET_SPEED = 0.6 // Very slow so text is easily readable
const PLAYER_SPEED = 2.5

// ============================================
// PARTICLE COMPONENT
// ============================================
const ParticleEffect = memo(({ particle, onComplete }: { particle: Particle; onComplete: () => void }) => (
  <motion.div
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      opacity: 0,
      scale: [1, 1.5, 0],
      y: [0, -30],
    }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    onAnimationComplete={onComplete}
    className="absolute text-cyber-green font-mono text-xs md:text-sm pointer-events-none z-20"
    style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
  >
    <span className="text-shadow-glow">+{particle.text}</span>
  </motion.div>
))
ParticleEffect.displayName = 'ParticleEffect'

// ============================================
// YOOCKH-BOT COMPONENT
// ============================================
const YoockhBot = memo(({ x }: { x: number }) => (
  <motion.div
    className="absolute bottom-4 z-10"
    style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
    animate={{ x: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  >
    {/* Robot Body */}
    <div className="relative w-10 h-12 md:w-12 md:h-14">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-cyber-blue/30 blur-lg rounded-lg" />
      
      {/* Main body */}
      <div className="relative w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg border-2 border-cyber-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]">
        {/* Head/Antenna */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyber-blue rounded-full shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyber-blue rounded-full animate-pulse shadow-[0_0_10px_rgba(0,212,255,1)]" />
        
        {/* Eyes */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-cyber-blue rounded-full animate-pulse shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-cyber-blue rounded-full animate-pulse shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
        </div>
        
        {/* Chest panel */}
        <div className="absolute top-6 md:top-7 left-1/2 -translate-x-1/2 w-6 h-3 md:w-7 md:h-4 bg-void-light rounded border border-cyber-blue/50">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[6px] md:text-[8px] text-cyber-blue font-mono">YCK</span>
          </div>
        </div>
      </div>
      
      {/* Arms */}
      <div className="absolute top-4 -left-1 w-1.5 h-4 bg-gray-600 rounded-full border border-cyber-blue/30" />
      <div className="absolute top-4 -right-1 w-1.5 h-4 bg-gray-600 rounded-full border border-cyber-blue/30" />
    </div>
  </motion.div>
))
YoockhBot.displayName = 'YoockhBot'

// ============================================
// BUG COMPONENT
// ============================================
const BugEnemy = memo(({ bug }: { bug: Bug }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className={`absolute font-mono text-center transition-transform ${bug.isBoss ? 'z-15' : 'z-5'}`}
    style={{ 
      left: `${bug.x}%`, 
      top: `${bug.y}%`,
      transform: 'translateX(-50%)',
    }}
  >
    <div className={`
      ${bug.isBoss 
        ? 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-xl bg-red-900/80 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
        : 'px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs bg-red-950/80 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
      }
      rounded text-red-400 backdrop-blur-sm relative
    `}>
      {/* Health bar for boss */}
      {bug.isBoss && (
        <div className="absolute -top-3 left-0 right-0 h-1.5 bg-gray-800 rounded overflow-hidden">
          <motion.div 
            className="h-full bg-red-500"
            initial={{ width: '100%' }}
            animate={{ width: `${(bug.health / bug.maxHealth) * 100}%` }}
          />
        </div>
      )}
      <span className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
        {bug.isBoss ? '⚠️ ' : ''}{bug.text}{bug.isBoss ? ' ⚠️' : ''}
      </span>
    </div>
  </motion.div>
))
BugEnemy.displayName = 'BugEnemy'

// ============================================
// BULLET COMPONENT
// ============================================
const BulletProjectile = memo(({ bullet }: { bullet: Bullet }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute font-mono text-sm md:text-base text-cyber-green z-10 font-bold"
    style={{ 
      left: `${bullet.x}%`, 
      top: `${bullet.y}%`,
      transform: 'translateX(-50%)',
    }}
  >
    <span className="px-2 py-1 bg-cyber-green/30 border-2 border-cyber-green rounded-lg shadow-[0_0_15px_rgba(0,255,136,0.7)]">
      {bullet.text}
    </span>
  </motion.div>
))
BulletProjectile.displayName = 'BulletProjectile'

// ============================================
// IDLE SCREEN COMPONENT
// ============================================
const IdleScreen = memo(({ onStart }: { onStart: () => void }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-start p-3 md:p-4 bg-void/90 overflow-y-auto">
    {/* Terminal style header */}
    <div className="w-full max-w-xs mt-2 mb-3 md:mb-6 flex-shrink-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-500 font-mono text-[9px] md:text-[10px]">bug_crusher.sh</span>
      </div>
      <div className="bg-void-light rounded-lg p-2 md:p-3 border border-white/10 font-mono text-[9px] md:text-xs">
        <p className="text-gray-500">$ ./init_debug_session</p>
        <p className="text-cyber-green mt-0.5">&gt; Loading modules...</p>
        <p className="text-cyber-blue">&gt; yoockh-bot ready</p>
        <p className="text-yellow-400">&gt; Bugs detected: <span className="text-red-400">CRITICAL</span></p>
        <p className="text-gray-400 mt-1">$ _<span className="animate-terminal-blink">▊</span></p>
      </div>
    </div>

    {/* Game title */}
    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 text-center flex-shrink-0">
      <span className="text-gradient">Bug</span>Crusher
    </h3>
    <p className="text-gray-400 text-[10px] md:text-sm mb-3 md:mb-6 text-center font-mono flex-shrink-0">
      Defend the server from bugs!
    </p>

    {/* Start button */}
    <motion.button
      onClick={onStart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 md:px-6 py-2 md:py-3 bg-cyber-green/20 border border-cyber-green text-cyber-green font-mono text-xs md:text-sm rounded-lg hover:bg-cyber-green/30 transition-colors shadow-[0_0_20px_rgba(0,255,136,0.3)] flex-shrink-0"
    >
      {">"} START DEBUGGING
    </motion.button>

    {/* Controls instructions - Terminal style */}
    <div className="mt-3 md:mt-6 w-full max-w-sm pb-2 flex-shrink-0">
      <div className="bg-void-light rounded-lg border border-white/10 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-void border-b border-white/10">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500" />
          <span className="ml-1 md:ml-2 text-gray-500 font-mono text-[8px] md:text-[10px]">controls.md</span>
        </div>
        
        {/* Terminal content */}
        <div className="p-2 md:p-4 font-mono text-[9px] md:text-[11px] space-y-2 md:space-y-3">
          <div>
            <p className="text-cyber-purple mb-0.5 md:mb-1">{"## Desktop"}</p>
            <div className="pl-1 md:pl-2 space-y-0.5 md:space-y-1 text-gray-400">
              <p><span className="text-cyber-blue">{">"}</span> <kbd className="px-1 py-0.5 bg-white/10 rounded text-[8px] md:text-[10px] border border-white/20">Arrow</kbd> / <kbd className="px-1 py-0.5 bg-white/10 rounded text-[8px] md:text-[10px] border border-white/20">A D</kbd> gerak</p>
              <p><span className="text-cyber-blue">{">"}</span> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[8px] md:text-[10px] border border-white/20">SPACE</kbd> tembak</p>
            </div>
          </div>
          
          <div>
            <p className="text-cyber-green mb-0.5 md:mb-1">{"## Mobile"}</p>
            <div className="pl-1 md:pl-2 space-y-0.5 md:space-y-1 text-gray-400">
              <p><span className="text-cyber-blue">{">"}</span> Swipe kiri/kanan gerak</p>
              <p><span className="text-cyber-blue">{">"}</span> Tap layar tembak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))
IdleScreen.displayName = 'IdleScreen'

// ============================================
// RESULT SCREEN COMPONENT
// ============================================
const ResultScreen = memo(({ 
  isWin, 
  score, 
  level,
  onRestart 
}: { 
  isWin: boolean
  score: number
  level: Level
  onRestart: () => void 
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-void/95 z-30"
  >
    {isWin ? (
      <>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-4xl md:text-5xl mb-4"
        >
          🎉
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold text-cyber-green mb-2 text-center">
          System Stable!
        </h3>
        <p className="text-gray-300 text-sm md:text-base text-center mb-2">
          You are a <span className="text-cyber-purple font-bold">Senior Backend Engineer!</span>
        </p>
      </>
    ) : (
      <>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-4xl md:text-5xl mb-4"
        >
          💥
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold text-red-400 mb-2 text-center">
          Server Crashed!
        </h3>
        <p className="text-gray-300 text-sm text-center mb-2">
          Bugs infiltrated the system
        </p>
      </>
    )}
    
    <p className="text-cyber-blue font-mono text-lg mb-1">Score: {score}</p>
    <p className="text-gray-500 font-mono text-xs mb-6">Level: {level}</p>
    
    <motion.button
      onClick={onRestart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-cyber-blue/20 border border-cyber-blue text-cyber-blue font-mono text-sm rounded-lg hover:bg-cyber-blue/30 transition-colors"
    >
      {">"} TRY AGAIN
    </motion.button>
  </motion.div>
))
ResultScreen.displayName = 'ResultScreen'

// ============================================
// MAIN GAME COMPONENT
// ============================================
export default function BugCrusher() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('idle')
  const [level, setLevel] = useState<Level>('Junior')
  const [score, setScore] = useState(0)
  const [playerX, setPlayerX] = useState(50)
  const [bugs, setBugs] = useState<Bug[]>([])
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [bossSpawned, setBossSpawned] = useState(false)
  
  // Refs for game loop
  const gameLoopRef = useRef<number | null>(null)
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const keysPressed = useRef<Set<string>>(new Set())
  const lastBulletTime = useRef(0)
  const containerControls = useAnimation()
  
  // Get current level config
  const levelConfig = GAME_CONFIG[level]
  
  // ============================================
  // SPAWN BUG
  // ============================================
  const spawnBug = useCallback(() => {
    if (gameState !== 'playing') return
    
    const config = GAME_CONFIG[level]
    
    // Check if we should spawn boss
    if (level === 'Senior' && score >= 400 && !bossSpawned) {
      setBossSpawned(true)
      const bossConfig = config.boss!
      const newBoss: Bug = {
        id: Date.now(),
        x: 50,
        y: 5,
        text: bossConfig.text,
        speed: 0.3,
        health: bossConfig.health,
        maxHealth: bossConfig.health,
        isBoss: true,
      }
      setBugs(prev => [...prev, newBoss])
      return
    }
    
    setBugs(prev => {
      if (prev.length >= config.maxBugs) return prev
      
      const bugTexts = config.bugs
      const newBug: Bug = {
        id: Date.now() + Math.random(),
        x: 10 + Math.random() * 80,
        y: -15,
        text: bugTexts[Math.floor(Math.random() * bugTexts.length)],
        speed: config.bugSpeed.min + Math.random() * (config.bugSpeed.max - config.bugSpeed.min),
        health: 1,
        maxHealth: 1,
        isBoss: false,
      }
      return [...prev, newBug]
    })
  }, [gameState, level, score, bossSpawned])
  
  // ============================================
  // SHOOT BULLET
  // ============================================
  const shootBullet = useCallback(() => {
    const now = Date.now()
    if (now - lastBulletTime.current < 250) return // Rate limit
    lastBulletTime.current = now
    
    const newBullet: Bullet = {
      id: now,
      x: playerX,
      y: 85,
      text: AMMO_TEXTS[Math.floor(Math.random() * AMMO_TEXTS.length)],
    }
    setBullets(prev => [...prev, newBullet])
  }, [playerX])
  
  // ============================================
  // GAME LOOP
  // ============================================
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return
    
    // Move player based on keys
    if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
      setPlayerX(prev => Math.max(PLAYER_WIDTH / 2, prev - PLAYER_SPEED))
    }
    if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
      setPlayerX(prev => Math.min(CONTAINER_WIDTH - PLAYER_WIDTH / 2, prev + PLAYER_SPEED))
    }
    if (keysPressed.current.has(' ')) {
      shootBullet()
    }
    
    // Move bullets
    setBullets(prev => prev
      .map(b => ({ ...b, y: b.y - BULLET_SPEED }))
      .filter(b => b.y > -5)
    )
    
    // Move bugs
    setBugs(prev => {
      const updatedBugs = prev.map(bug => ({
        ...bug,
        y: bug.y + bug.speed,
        // Add slight horizontal wobble for Mid+ levels
        x: level !== 'Junior' && !bug.isBoss
          ? bug.x + Math.sin(bug.y * 0.1) * 0.5
          : bug.x,
      }))
      
      // Check if any bug reached bottom
      const bugReachedBottom = updatedBugs.some(bug => bug.y >= 90)
      if (bugReachedBottom) {
        // Shake effect
        containerControls.start({
          x: [0, -5, 5, -5, 5, 0],
          transition: { duration: 0.4 }
        })
        setGameState('lose')
        return prev
      }
      
      return updatedBugs
    })
    
    // Collision detection
    setBullets(prevBullets => {
      let newBullets = [...prevBullets]
      
      setBugs(prevBugs => {
        let newBugs = [...prevBugs]
        const newParticles: Particle[] = []
        let scoreToAdd = 0
        
        newBullets = newBullets.filter(bullet => {
          const hitBugIndex = newBugs.findIndex(bug => {
            const dx = Math.abs(bullet.x - bug.x)
            const dy = Math.abs(bullet.y - bug.y)
            const hitRadius = bug.isBoss ? 18 : 12
            return dx < hitRadius && dy < hitRadius
          })
          
          if (hitBugIndex !== -1) {
            const hitBug = newBugs[hitBugIndex]
            
            // Add particle
            newParticles.push({
              id: Date.now() + Math.random(),
              x: hitBug.x,
              y: hitBug.y,
              text: hitBug.isBoss ? '50' : '10',
            })
            
            if (hitBug.isBoss && hitBug.health > 1) {
              // Damage boss
              newBugs[hitBugIndex] = { ...hitBug, health: hitBug.health - 1 }
              scoreToAdd += 10
            } else {
              // Remove bug
              newBugs = newBugs.filter((_, i) => i !== hitBugIndex)
              scoreToAdd += hitBug.isBoss ? 100 : 10
            }
            
            return false // Remove bullet
          }
          return true
        })
        
        // Update particles
        if (newParticles.length > 0) {
          setParticles(prev => [...prev, ...newParticles])
        }
        
        // Update score
        if (scoreToAdd > 0) {
          setScore(prev => {
            const newScore = prev + scoreToAdd
            // Check level progression
            if (level === 'Junior' && newScore >= GAME_CONFIG.Junior.winScore) {
              setLevel('Mid')
            } else if (level === 'Mid' && newScore >= GAME_CONFIG.Mid.winScore) {
              setLevel('Senior')
            } else if (level === 'Senior' && newScore >= GAME_CONFIG.Senior.winScore) {
              setGameState('win')
            }
            return newScore
          })
        }
        
        return newBugs
      })
      
      return newBullets
    })
    
    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, level, shootBullet, containerControls])
  
  // ============================================
  // START GAME
  // ============================================
  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
    setLevel('Junior')
    setPlayerX(50)
    setBugs([])
    setBullets([])
    setParticles([])
    setBossSpawned(false)
  }, [])
  
  // ============================================
  // KEYBOARD HANDLERS
  // ============================================
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)
      if (e.key === ' ') e.preventDefault()
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState])
  
  // ============================================
  // GAME LOOP EFFECT
  // ============================================
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
      spawnIntervalRef.current = setInterval(spawnBug, levelConfig.spawnRate)
    }
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    }
  }, [gameState, gameLoop, spawnBug, levelConfig.spawnRate])
  
  // Update spawn rate when level changes
  useEffect(() => {
    if (gameState !== 'playing') return
    
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    spawnIntervalRef.current = setInterval(spawnBug, levelConfig.spawnRate)
    
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    }
  }, [level, spawnBug, levelConfig.spawnRate, gameState])
  
  // ============================================
  // TOUCH HANDLERS
  // ============================================
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (gameState !== 'playing' || !containerRef.current) return
    
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    setPlayerX(Math.max(PLAYER_WIDTH / 2, Math.min(CONTAINER_WIDTH - PLAYER_WIDTH / 2, x)))
  }, [gameState])
  
  const handleTouchStart = useCallback(() => {
    if (gameState === 'playing') {
      shootBullet()
    }
  }, [gameState, shootBullet])
  
  // Remove particle after animation
  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <motion.div
      ref={containerRef}
      animate={containerControls}
      className="relative w-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px] glass-card border border-white/10 overflow-hidden select-none rounded-2xl"
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
      </div>
      
      {/* Game HUD */}
      {gameState === 'playing' && (
        <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-start">
          <div className="font-mono text-xs md:text-sm">
            <p className="text-cyber-blue">Score: <span className="text-white">{score}</span></p>
            <p className="text-cyber-purple">Level: <span className="text-white">{level}</span></p>
          </div>
          <div className="text-right font-mono text-[10px] text-gray-500">
            <p>Target: {levelConfig.winScore}</p>
          </div>
        </div>
      )}
      
      {/* Level up notification */}
      <AnimatePresence>
        {gameState === 'playing' && level !== 'Junior' && (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 bg-cyber-purple/30 border border-cyber-purple rounded-lg"
            >
              <span className="text-cyber-purple font-mono text-sm font-bold">
                LEVEL UP: {level}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bugs */}
      <AnimatePresence>
        {bugs.map(bug => (
          <BugEnemy key={bug.id} bug={bug} />
        ))}
      </AnimatePresence>
      
      {/* Bullets */}
      <AnimatePresence>
        {bullets.map(bullet => (
          <BulletProjectile key={bullet.id} bullet={bullet} />
        ))}
      </AnimatePresence>
      
      {/* Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <ParticleEffect 
            key={particle.id} 
            particle={particle} 
            onComplete={() => removeParticle(particle.id)} 
          />
        ))}
      </AnimatePresence>
      
      {/* Player */}
      {gameState === 'playing' && <YoockhBot x={playerX} />}
      
      {/* Idle Screen */}
      {gameState === 'idle' && <IdleScreen onStart={startGame} />}
      
      {/* Result Screen */}
      {(gameState === 'win' || gameState === 'lose') && (
        <ResultScreen 
          isWin={gameState === 'win'} 
          score={score} 
          level={level}
          onRestart={startGame} 
        />
      )}
    </motion.div>
  )
}
