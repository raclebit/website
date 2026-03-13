'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Industries = ({ industries }: { industries: any[] }) => {
  const cardsRef = useScrollReveal('blurUp', { stagger: 0.15 })

  return (
    <section className="py-32 bg-white text-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-heading mb-20 tracking-tight text-center">
          <AnimatedText text="Industries We Serve" className="justify-center" />
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((ind, idx) => (
            <div key={idx} className="p-8 border border-gray-200 hover:border-black transition-colors duration-300">
              <div className="font-heading text-2xl mb-4">{ind.name}</div>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}