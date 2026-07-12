'use client'

import { Suspense, useMemo, useRef } from 'react'
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
// Reduced size when parked in the certificates/contact sections
const SMALL_SCALE = 0.5

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
  const spin = useRef(0)
  const spinSpeed = useRef(0)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // Find the section currently crossing the viewport midline, plus the
    // scroll progress inside the projects section for its scroll-tied spin.
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
    const pxToWorld = state.viewport.width / state.size.width

    // Side offset for hero/experience, clamped so the body never leaves the
    // frame on narrow viewports
    const sideX = THREE.MathUtils.clamp(halfW - CHAR_HALF - EDGE_MARGIN, 0.8, 2.4)
    // Rest the feet just above the bottom edge, full body visible
    const restY = (s: number) => -halfH + CHAR_HALF * s + EDGE_MARGIN

    let anchor = { x: 0, y: restY(1), s: 1, face: 0 }
    switch (current) {
      case 'home':
        anchor = { x: -sideX, y: restY(1), s: 1, face: 0.55 }
        break
      case 'experience':
        anchor = { x: sideX, y: restY(1), s: 1, face: -0.55 }
        break
      case 'education':
      case 'projects':
        anchor = { x: 0, y: restY(1), s: 1, face: 0 }
        break
      case 'certificates':
        // Shrunk, centered in the open space below the marquee
        anchor = { x: 0, y: restY(SMALL_SCALE), s: SMALL_SCALE, face: 0 }
        break
      case 'contact': {
        // Park beside the centered contact card (max-w-4xl = 896px); if the
        // viewport is too narrow to fit it fully without overlap, scale to 0
        const cardHalf = (Math.min(896, state.size.width * 0.9) / 2) * pxToWorld
        const cw = CHAR_HALF * SMALL_SCALE
        const x = cardHalf + 0.25 + cw
        const fits = x + cw + 0.15 <= halfW
        anchor = fits
          ? { x, y: restY(SMALL_SCALE), s: SMALL_SCALE, face: -0.4 }
          : { x: halfW, y: restY(SMALL_SCALE), s: 0.001, face: 0 }
        break
      }
    }

    // Frame-rate independent damping toward the section anchor
    const k = 1 - Math.exp(-3.5 * delta)
    g.position.x = THREE.MathUtils.lerp(g.position.x, anchor.x, k)
    g.position.y = THREE.MathUtils.lerp(g.position.y, anchor.y, k)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, anchor.s, k))

    // Hover auto-spin winds up/down smoothly instead of snapping
    spinSpeed.current = THREE.MathUtils.lerp(
      spinSpeed.current,
      characterState.hovered ? 2.5 : 0,
      k
    )
    spin.current += spinSpeed.current * delta

    // One full scroll-driven revolution across the projects section; the
    // clamped progress keeps it at 0 before and 2π (≡ facing forward) after.
    const target =
      anchor.face + spin.current + projectsProgress * Math.PI * 2
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, target, k)
  })

  return <group ref={group}>{children}</group>
}

export default function CharacterScene() {
  return (
    <div
      aria-hidden
      className="fixed inset-y-0 right-0 left-0 md:left-20 lg:left-24 z-0 pointer-events-none hidden md:block"
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
