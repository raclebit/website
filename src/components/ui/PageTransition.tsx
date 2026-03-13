'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { usePathname } from 'next/navigation'

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!containerRef.current) return
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }, [pathname])

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  )
}