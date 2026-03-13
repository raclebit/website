'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const CTASection = () => {
  const buttonRef = useScrollReveal('scaleUp', { delay: 0.8 })
  const textRef = useScrollReveal('fadeUp', { delay: 0.5 })

  return (
    <section className="py-40 bg-[#1B1B1B] text-[#FAFAFA] relative overflow-hidden noise-bg">
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-heading mb-8 tracking-tighter leading-[1.1]">
          <AnimatedText text="Let&apos;s Build Systems That Last." className="justify-center" />
        </h2>
        <p ref={textRef} className="font-sans text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Technology that scales with clarity and creates real impact. Start a conversation to explore how we can engineer your next digital product.
        </p>
        <div ref={buttonRef}>
          <Button variant="outline" asChild>
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
