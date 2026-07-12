'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { characterState } from './characterState'

const MODEL_PATH = '/assets/models/coder-desk.glb'

useGLTF.preload(MODEL_PATH)

const SECTION_IDS = [
  'home',
  'experience',
  'education',
  'projects',
  'certificates',
  'contact',
] as const

type SectionId = (typeof SECTION_IDS)[number]

// Model is normalized to 2.4 world units (see CharacterModel), so half its
// extent at scale s is 1.2 * s. All anchor math is derived from the live
// viewport size each frame, so the full body always stays inside the frame
// with a margin — at any resolution or aspect ratio.
const CHAR_HALF = 1.2
const EDGE_MARGIN = 0.35
// Reduced size when parked in the certificates section
const SMALL_SCALE = 0.6

function CharacterModel() {
  const { scene } = useGLTF(MODEL_PATH)

  // Normalize whatever size/origin the GLB has to ~2.4 world units, centered.
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = 2.4 / Math.max(size.x, size.y, size.z)
    scene.scale.setScalar(s)
    scene.position.set(-center.x * s, -center.y * s, -center.z * s)
  }, [scene])

  return <primitive object={scene} />
}

function CharacterRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // Find the section currently crossing the viewport midline, plus the
    // clamped scroll progress inside the projects section: 0 before it,
    // 0→1 across it, and held at exactly 1 after it — it can never
    // extrapolate past those bounds.
    const mid = window.innerHeight / 2
    let current: SectionId = 'home'
    let projectsProgress = 0
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= mid) current = id
      if (id === 'projects') {
        projectsProgress = THREE.MathUtils.clamp(
          (mid - rect.top) / Math.max(rect.height, 1),
          0,
          1
        )
      }
    }

    // Visible world extents at the character's depth (z = 0)
    const halfW = state.viewport.width / 2
    const halfH = state.viewport.height / 2

    // Side offset for hero/experience, clamped so the body never leaves the
    // frame on narrow viewports
    const sideX = THREE.MathUtils.clamp(halfW - CHAR_HALF - EDGE_MARGIN, 0.8, 2.4)
    // Rest the feet just above the bottom edge, full body visible
    const restY = (s: number) => -halfH + CHAR_HALF * s + EDGE_MARGIN

    // Base rotation is 0 (facing forward) in every section. The only
    // additions are: bounded cursor-follow in hero (while hovering) and
    // education, and the scroll-tied revolution across projects. Because
    // projectsProgress is clamped to [0, 1], the rotation is exactly 2π
    // (≡ facing forward) in certificates/contact — never stuck backward.
    let anchor = { x: 0, y: restY(1), s: 1 }
    let baseRot = 0
    switch (current) {
      case 'home':
        anchor = { x: -sideX, y: restY(1), s: 1 }
        baseRot = characterState.heroHover ? characterState.heroRot : 0
        break
      case 'experience':
        anchor = { x: sideX, y: restY(1), s: 1 }
        break
      case 'education':
        anchor = { x: 0, y: restY(1), s: 1 }
        baseRot = characterState.pointerRot
        break
      case 'projects':
        anchor = { x: 0, y: restY(1), s: 1 }
        break
      case 'certificates':
        // Shrunk and bottom-anchored in the space below the marquee
        anchor = { x: 0, y: restY(SMALL_SCALE), s: SMALL_SCALE }
        break
      case 'contact':
        // The contact form is the focal point: the character stays pinned
        // at its certificates position and simply fades out — no shrinking
        // into a corner, no flying off to the side.
        anchor = { x: 0, y: restY(SMALL_SCALE), s: 0.001 }
        break
    }

    // Frame-rate independent damping toward the section anchor
    const k = 1 - Math.exp(-3.5 * delta)
    g.position.x = THREE.MathUtils.lerp(g.position.x, anchor.x, k)
    g.position.y = THREE.MathUtils.lerp(g.position.y, anchor.y, k)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, anchor.s, k))

    const targetRot = baseRot + projectsProgress * Math.PI * 2
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRot, k)
  })

  return <group ref={group}>{children}</group>
}

export default function CharacterScene() {
  // Gentle viewport-wide cursor tracking for the education section's
  // cursor-follow; resets to forward-facing when the cursor leaves the page.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const norm = (e.clientX / window.innerWidth) * 2 - 1
      characterState.pointerRot = THREE.MathUtils.clamp(norm, -1, 1) * 0.5
    }
    const onLeave = () => {
      characterState.pointerRot = 0
    }
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none hidden md:block"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#00ff88" />
        <Suspense fallback={null}>
          <CharacterRig>
            <CharacterModel />
          </CharacterRig>
        </Suspense>
      </Canvas>
    </div>
  )
}
