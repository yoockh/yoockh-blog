'use client'

import dynamic from 'next/dynamic'

// The WebGL scene can only render client-side; ssr:false requires a client
// component boundary, hence this thin wrapper.
const CharacterScene = dynamic(() => import('./CharacterScene'), {
  ssr: false,
})

export default function CharacterCanvas() {
  return <CharacterScene />
}
