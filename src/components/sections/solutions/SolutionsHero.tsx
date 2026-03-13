'use client'

import React from 'react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const SolutionsHero = () => {
  const textRef = useScrollReveal('fadeUp', { delay: 0.8 })

  return (
    <section className="pt-48 pb-32 bg-[#FAFAFA] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="mb-8 tracking-tighter">
          <AnimatedText text="Engineering Solutions For Scale." className="justify-center" />
        </h1>
        <p ref={textRef} className="font-sans text-xl text-gray-600 leading-relaxed mx-auto max-w-2xl">
          We provide end-to-end technical expertise, from blueprinting complex system architectures to maintaining robust, typed codebases.
        </p>
      </div>
    </section>
  )
}