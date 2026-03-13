'use client'

import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export const HowWeWork = () => {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  
  const steps = [
    { title: 'Business Discovery', desc: 'Understanding your constraints, goals, and current architectural bottlenecks before writing a single line of code.' },
    { title: 'System Architecture Blueprint', desc: 'Designing the technical foundation. Selecting the right stack, database schema, and integration points.' },
    { title: 'Development & Integration', desc: 'Agile execution of the blueprint. We build reliable, typed, and tested components.' },
    { title: 'Testing & Validation', desc: 'Rigorous QA. We simulate load, test edge cases, and ensure the system behaves predictably.' },
    { title: 'Deployment & Support', desc: 'Seamless transition to production. We provide documentation and long-term support.' },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current || !lineRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(lineRef.current, { scaleY: 1 })
      return
    }

    const stepsEls = containerRef.current.querySelectorAll('.step-item')

    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      }
    )

    stepsEls.forEach((step, idx) => {
      gsap.fromTo(step,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            once: true,
          }
        }
      )
    })
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <h2 className="text-4xl md:text-5xl font-heading mb-24 tracking-tight text-center">How We Work</h2>
        
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-[27px] md:left-[39px] top-0 bottom-0 w-px bg-gray-200" />
          <div 
            ref={lineRef} 
            className="absolute left-[27px] md:left-[39px] top-0 bottom-0 w-px bg-black origin-top" 
          />

          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="step-item flex gap-8 md:gap-16 items-start">
                <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-white border border-gray-200 rounded-full flex items-center justify-center font-heading text-xl md:text-2xl font-medium shadow-sm z-10">
                  0{idx + 1}
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className="font-heading text-2xl md:text-3xl mb-4">{step.title}</h3>
                  <p className="font-sans text-gray-600 leading-relaxed text-base md:text-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}