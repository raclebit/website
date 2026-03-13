'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const BrandValues = () => {
  const cardsRef = useScrollReveal('stagger')

  const values = [
    { title: 'Calm & Confident', desc: 'We don\'t rush or panic. We analyze problems methodically and deliver assured, tested solutions.' },
    { title: 'Analytical & Structured', desc: 'Every decision is backed by logic and architectural best practices, not temporary trends.' },
    { title: 'Professional & Approachable', desc: 'We communicate complex technical concepts clearly, making engineering accessible to stakeholders.' },
    { title: 'Detail-Oriented & Accountable', desc: 'We take ownership of the codebase. We sweat the small details because they compound at scale.' },
  ]

  return (
    <section className="py-32 bg-[#1B1B1B] text-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-heading mb-20 tracking-tight text-center">
          <AnimatedText text="Brand Values" className="justify-center" />
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 perspective-[1000px]">
          {values.map((value, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 rotate-icon transition-transform duration-500 hover:rotate-180">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <h3 className="font-heading text-xl mb-4">{value.title}</h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}