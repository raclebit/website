'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export const Marquee = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const items = [
    "Financial Services",
    "E-Commerce",
    "Professional Services",
    "SaaS & Startups",
    "System Architecture",
    "Scalable Systems",
  ]

  // Double the items for seamless loop
  const displayItems = [...items, ...items, ...items]

  useEffect(() => {
    if (!trackRef.current) return
    
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const track = trackRef.current
    
    // Animate to -33.33% since we tripled the array (so it moves exactly one full original length)
    const tween = gsap.to(track, {
      xPercent: -33.33333,
      ease: 'none',
      duration: 20,
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section className="bg-[#1B1B1B] text-[#FAFAFA] py-6 border-y border-[#1B1B1B] overflow-hidden whitespace-nowrap select-none">
      <div ref={containerRef} className="relative w-full">
        <div ref={trackRef} className="inline-flex items-center gap-12 font-sans font-medium text-sm md:text-base uppercase tracking-widest pl-12">
          {displayItems.map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}