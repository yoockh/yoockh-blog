'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import clsx from 'clsx'

const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'experience', label: 'exp' },
  { id: 'education', label: 'edu' },
  { id: 'projects', label: 'proj' },
  { id: 'certificates', label: 'certs' },
  { id: 'contact', label: 'contact' },
]

const RING_RADIUS = 1.2
const TUBE_RADIUS = 0.03
const NODE_RADIUS = 0.06
const LABEL_OFFSET = 0.42

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function OrbitalRing({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null)

  const nodes = useMemo(
    () =>
      SECTIONS.map((section, i) => {
        // First node at the top, going clockwise
        const angle = Math.PI / 2 - (i / SECTIONS.length) * Math.PI * 2
        const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle))
        return {
          ...section,
          position: [dir.x * RING_RADIUS, dir.y * RING_RADIUS, 0] as [number, number, number],
          labelPosition: [
            dir.x * (RING_RADIUS + LABEL_OFFSET),
            dir.y * (RING_RADIUS + LABEL_OFFSET),
            0,
          ] as [number, number, number],
        }
      }),
    []
  )

  useFrame((state) => {
    const g = group.current
    if (!g) return
    // Slow ambient rotation (one revolution per ~35s) plus a scroll-driven
    // offset so section navigation feels tied to the ring's motion
    const doc = document.documentElement
    const maxScroll = doc.scrollHeight - window.innerHeight
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
    g.rotation.z =
      state.clock.elapsedTime * ((Math.PI * 2) / 35) +
      scrollProgress * Math.PI * 2
  })

  return (
    <group ref={group}>
      {/* Base orbital torus — visible tube thickness, emissive neon green */}
      <mesh>
        <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, 16, 100]} />
        <meshStandardMaterial
          color="#00220f"
          emissive="#00ff88"
          emissiveIntensity={1.6}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Section nodes + HTML label overlays (no text inside the 3D scene) */}
      {nodes.map((node, i) => {
        const isActive = i === activeIndex
        return (
          <group key={node.id}>
            <mesh
              position={node.position}
              scale={isActive ? 1.8 : 1}
              onClick={() => scrollToSection(node.id)}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
              <sphereGeometry args={[NODE_RADIUS, 16, 16]} />
              <meshStandardMaterial
                color="#00220f"
                emissive="#00ff88"
                emissiveIntensity={isActive ? 2.4 : 0.7}
                transparent
                opacity={isActive ? 1 : 0.85}
              />
            </mesh>
            <Html
              position={node.labelPosition}
              center
              distanceFactor={5}
              zIndexRange={[40, 0]}
            >
              <button
                onClick={() => scrollToSection(node.id)}
                className={clsx(
                  'font-mono text-[11px] whitespace-nowrap transition-colors duration-300',
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

export default function OrbitalNavCanvas({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ overflow: 'visible' }}
    >
      {/* The EffectComposer can't preserve canvas alpha, so match its clear
          color to the page background — the canvas square becomes invisible */}
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} />
      {/* Tilt along X so the ring reads as an ellipse in perspective */}
      <group rotation={[0.3, 0, 0]}>
        <OrbitalRing activeIndex={activeIndex} />
        {/* Decorative crossing orbit */}
        <mesh rotation={[1.25, 0.4, 0]}>
          <torusGeometry args={[RING_RADIUS * 1.12, 0.012, 8, 96]} />
          <meshStandardMaterial
            color="#00220f"
            emissive="#00ff88"
            emissiveIntensity={0.6}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>
      {/* Neon bloom so the emissive green actually spreads like real light.
          No mipmapBlur: it breaks the canvas alpha channel and would paint
          an opaque square over the page background. */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.3}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
        />
      </EffectComposer>
    </Canvas>
  )
}
