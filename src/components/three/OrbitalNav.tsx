'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const OrbitalNavCanvas = dynamic(() => import('./OrbitalNavCanvas'), {
  ssr: false,
})

const SECTION_IDS = [
  'home',
  'experience',
  'education',
  'projects',
  'certificates',
  'contact',
] as const

export default function OrbitalNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  // Left for sections 1–3 (home/experience/education), right for 4–6
  // (projects/certificates/contact). The flip triggers exactly when the
  // projects section crosses the viewport midline — the same boundary the
  // navbar scroll-spy and the 3D character use.
  const [isRightSide, setIsRightSide] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2
      let idx = 0
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) idx = i
      })
      setActiveIndex(idx)
      setIsRightSide(idx >= 3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="hidden lg:block">
      {/* Keying by side makes AnimatePresence run exit (fade+shrink) on the
          old side while the new side fades in and scales up — a cross-fade,
          not a slide across the screen. */}
      <AnimatePresence>
        <motion.div
          key={isRightSide ? 'right' : 'left'}
          className={clsx(
            'fixed top-1/2 z-40 w-40 h-40',
            isRightSide ? 'right-10' : 'left-10'
          )}
          initial={{ opacity: 0, scale: 0.6, y: '-50%' }}
          animate={{ opacity: 1, scale: 1, y: '-50%' }}
          exit={{ opacity: 0, scale: 0.6, y: '-50%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <OrbitalNavCanvas activeIndex={activeIndex} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
