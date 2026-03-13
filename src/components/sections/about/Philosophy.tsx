'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const Philosophy = () => {
  const sectionRef = useScrollReveal('clipTop')
  const textRef = useScrollReveal('fadeUp', { delay: 0.5 })

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <section className="py-32 bg-[#FAFAFA] border-y border-gray-200 relative">
        {/* Decorative Quote */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-heading text-black/[0.02] leading-none pointer-events-none select-none font-bold">
          "
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-heading mb-12 tracking-tight leading-[1.1]">
            <AnimatedText text="&quot;Digital products should be engineered, not improvised.&quot;" className="justify-center" />
          </h2>
          <p ref={textRef} className="font-sans text-xl text-gray-600 leading-relaxed">
            We treat software development as an engineering discipline. Every architecture decision, database query, and line of code is written with long-term maintainability in mind. We build systems that internal teams can confidently take over.
          </p>
        </div>
      </section>
    </div>
  )
}