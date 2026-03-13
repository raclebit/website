'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CoreFocus = ({ focus }: { focus: any[] }) => {
  const listRef = useScrollReveal('stagger')

  return (
    <section className="py-32 bg-[#FAFAFA] border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-heading mb-20 tracking-tight text-center">
          <AnimatedText text="Core Focus Areas" className="justify-center" />
        </h2>
        
        <div ref={listRef} className="flex flex-col">
          {focus.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row py-8 border-b border-gray-200 gap-6 md:gap-12 group">
              <div className="font-heading font-medium text-lg md:text-2xl text-gray-400 group-hover:text-black transition-colors w-12 shrink-0">
                0{idx + 1}
              </div>
              <div>
                <h3 className="font-heading text-2xl md:text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}