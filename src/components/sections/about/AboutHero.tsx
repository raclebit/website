'use client'

import React, { useEffect, useRef } from 'react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { gsap } from '@/lib/gsap'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const AboutHero = () => {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useScrollReveal('fadeUp', { delay: 0.5 })

  useEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.fromTo('.about-shape', 
      { scale: 0.8, opacity: 0, rotation: -15 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="mb-8 tracking-tighter">
              <AnimatedText text="We Engineer Digital Systems." />
            </h1>
            <p ref={textRef} className="font-sans text-xl text-gray-600 leading-relaxed max-w-lg">
              Raclebit is a digital technology studio based in Indonesia. We believe that software shouldn't just look good—it must be architected to scale, perform, and endure.
            </p>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Geometric Decorative Element */}
            <div className="about-shape relative w-full max-w-[400px] aspect-square">
              <div className="absolute inset-0 bg-black rotate-3 rounded-sm" />
              <div className="absolute inset-0 bg-gray-200 -rotate-6 transform origin-bottom-right rounded-sm border border-gray-300" />
              <div className="absolute inset-0 bg-white border border-black flex flex-col p-8 justify-between z-10">
                <div className="w-8 h-8 rounded-full bg-black" />
                <div className="flex gap-2">
                  <div className="w-full h-px bg-black" />
                  <div className="w-1/2 h-px bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}