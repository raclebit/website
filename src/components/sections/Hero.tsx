'use client'

import React from 'react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const Hero = () => {
  const subtextRef = useScrollReveal('fadeUp', { delay: 0.6 })
  const buttonsRef = useScrollReveal('stagger', { delay: 1 })
  const numberRef = useScrollReveal('fadeRight', { delay: 1.2 })

  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-center bg-[#FAFAFA] overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <h1 className="mb-8 tracking-tighter">
            <AnimatedText 
              text="We Build Digital Systems That Last." 
              className="text-black leading-[0.9]"
            />
          </h1>
          
          <div ref={subtextRef} className="max-w-2xl font-sans text-lg md:text-xl text-black/70 mb-12 leading-relaxed">
            We design and build well-architected digital systems that grow with your business. Technology partner focused on system architecture, scalability, and long-term reliability.
          </div>
          
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative large number */}
      <div ref={numberRef} className="absolute right-0 bottom-0 text-[30vw] font-heading font-bold text-black/[0.03] leading-none select-none pointer-events-none translate-x-1/4 translate-y-1/4">
        01
      </div>
    </section>
  )
}
