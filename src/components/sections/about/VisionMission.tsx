'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const VisionMission = () => {
  const vBody = useScrollReveal('fadeRight', { delay: 0.3 })
  const mBody = useScrollReveal('fadeLeft', { delay: 0.3 })

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 relative">
          
          {/* Divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200" />
          
          <div className="md:pr-24">
            <h2 className="text-3xl md:text-4xl font-heading mb-8 tracking-tight">
              <AnimatedText text="Vision" />
            </h2>
            <p ref={vBody} className="font-sans text-gray-600 leading-relaxed text-lg">
              To be the definitive technology partner for organizations that demand precision, scalability, and long-lasting digital foundations.
            </p>
          </div>
          
          <div className="md:pl-24">
            <h2 className="text-3xl md:text-4xl font-heading mb-8 tracking-tight">
              <AnimatedText text="Mission" />
            </h2>
            <p ref={mBody} className="font-sans text-gray-600 leading-relaxed text-lg">
              We empower businesses by architecting and developing robust systems that automate workflows, unify data, and eliminate technical debt.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}