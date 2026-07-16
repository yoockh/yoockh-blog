'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import clsx from 'clsx'

export type OrbitalSide = 'left' | 'right'

const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'experience', label: 'experience' },
  { id: 'education', label: 'education' },
  { id: 'projects', label: 'projects' },
  { id: 'certificates', label: 'certificates' },
  { id: 'contact', label: 'contact' },
]

// Nodes are spread across the visible arc only (±50° around the ring's
// viewport-facing point), not the full 360° — the rest of the ring is
// off-screen.
const NODE_TOP_DEG = 50
const NODE_STEP_DEG = 20
const TICK_COUNT = 48

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function MassiveRing({
  activeIndex,
  side,
}: {
  activeIndex: number
  side: OrbitalSide
}) {
  const ticks = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Ring diameter = 90% of viewport height. The center sits half a radius
  // outside the viewport edge, so a ~120° arc (a third of the circumference)
  // peeks into view, spanning ~78% of the viewport height.
  const R = viewport.height * 0.45
  const sign = side === 'left' ? -1 : 1
  const centerX = sign * (R * 0.5 + viewport.width / 2)

  const tube = R * 0.012
  const nodeRadius = R * 0.028

  const nodes = useMemo(
    () =>
      SECTIONS.map((section, i) => {
        // Top-to-bottom along the visible arc; mirrored for the right side
        const t = THREE.MathUtils.degToRad(NODE_TOP_DEG - i * NODE_STEP_DEG)
        const angle = side === 'left' ? t : Math.PI - t
        const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle))
        return {
          ...section,
          position: [centerX + dir.x * R, dir.y * R, 0] as [number, number, number],
          labelPosition: [
            centerX + dir.x * (R + R * 0.07),
            dir.y * (R + R * 0.07),
            0,
          ] as [number, number, number],
        }
      }),
    [R, centerX, side]
  )

  useFrame((state) => {
    const g = ticks.current
    if (!g) return
    // Slow ambient rotation (one revolution per ~35s) plus a scroll-driven
    // offset. The gear ticks carry the visible motion; the nodes stay
    // pinned to the visible arc so navigation remains usable.
    const doc = document.documentElement
    const maxScroll = doc.scrollHeight - window.innerHeight
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
    g.rotation.z =
      state.clock.elapsedTime * ((Math.PI * 2) / 35) +
      scrollProgress * Math.PI * 2
  })

  return (
    <group>
      {/* Main torus — most of it extends beyond the viewport */}
      <mesh position={[centerX, 0, 0]}>
        <torusGeometry args={[R, tube, 16, 160]} />
        <meshStandardMaterial
          color="#00220f"
          emissive="#00ff88"
          emissiveIntensity={0.85}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner companion ring, fainter */}
      <mesh position={[centerX, 0, 0]}>
        <torusGeometry args={[R * 0.93, tube * 0.4, 12, 160]} />
        <meshStandardMaterial
          color="#00220f"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Rotating gear ticks along the ring's circumference */}
      <group ref={ticks} position={[centerX, 0, 0]}>
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const a = (i / TICK_COUNT) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * R, Math.sin(a) * R, 0]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[R * 0.04, R * 0.007, R * 0.007]} />
              <meshStandardMaterial
                color="#00220f"
                emissive="#00ff88"
                emissiveIntensity={0.8}
                transparent
                opacity={0.55}
              />
            </mesh>
          )
        })}
      </group>

      {/* Section nodes pinned to the visible arc + HTML labels */}
      {nodes.map((node, i) => {
        const isActive = i === activeIndex
        return (
          <group key={node.id}>
            <mesh position={node.position} scale={isActive ? 1.6 : 1}>
              <sphereGeometry args={[nodeRadius, 16, 16]} />
              <meshStandardMaterial
                color="#00220f"
                emissive="#00ff88"
                emissiveIntensity={isActive ? 2.4 : 0.8}
                transparent
                opacity={isActive ? 1 : 0.85}
              />
            </mesh>
            <Html position={node.labelPosition} zIndexRange={[40, 0]}>
              <button
                onClick={() => scrollToSection(node.id)}
                className={clsx(
                  'pointer-events-auto block font-mono text-xs whitespace-nowrap',
                  '-translate-y-1/2 transition-colors duration-300',
                  side === 'right' && '-translate-x-full',
                  isActive
                    ? 'text-cyber-green text-glow-green'
                    : 'text-cyber-green/50 hover:text-cyber-green'
                )}
              >
                {node.label}
              </button>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export default function OrbitalNavCanvas({
  activeIndex,
  side,
}: {
  activeIndex: number
  side: OrbitalSide
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      {/* Tilt along X so the giant ring leans back in perspective */}
      <group rotation={[0.25, 0, 0]}>
        <MassiveRing activeIndex={activeIndex} side={side} />
      </group>
      {/* Neon bloom so the emissive green actually spreads like real light.
          No mipmapBlur: it breaks the canvas alpha channel. */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.3}
        />
      </EffectComposer>
    </Canvas>
  )
}
