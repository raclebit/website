'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const EngagementModels = () => {
  const cardsRef = useScrollReveal('rotateUp', { stagger: 0.15 })

  const models = [
    {
      title: 'Project-Based',
      desc: 'End-to-end development of custom applications, from architecture to deployment.',
      features: ['Fixed scope & timeline', 'Dedicated engineering team', 'Post-launch warranty'],
      featured: false,
    },
    {
      title: 'Technology Partnership',
      desc: 'Ongoing collaboration as your technical arm to scale and maintain your systems.',
      features: ['Retainer-based', 'Proactive maintenance', 'Architecture consulting', 'Priority support'],
      featured: true,
    },
    {
      title: 'System Audit',
      desc: 'Comprehensive review of your existing architecture to identify bottlenecks and debt.',
      features: ['Codebase review', 'Security assessment', 'Performance optimization plan'],
      featured: false,
    },
  ]

  return (
    <section className="py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 tracking-tight">
            <AnimatedText text="Engagement Models" className="justify-center" />
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto text-lg">
            Flexible ways to work with us, tailored to your technical needs and organizational maturity.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {models.map((model, idx) => (
            <div 
              key={idx} 
              className={cn(
                "p-10 border transition-all duration-300 hover:-translate-y-2 flex flex-col",
                model.featured 
                  ? "bg-[#1B1B1B] text-[#FAFAFA] border-[#1B1B1B] shadow-xl" 
                  : "bg-white text-black border-gray-200 hover:shadow-lg"
              )}
            >
              <h3 className="font-heading text-2xl mb-4">{model.title}</h3>
              <p className={cn("font-sans text-sm mb-8 leading-relaxed", model.featured ? "text-white/70" : "text-gray-600")}>
                {model.desc}
              </p>
              
              <ul className="flex flex-col gap-3 mb-12 flex-grow">
                {model.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 font-sans text-sm">
                    <div className={cn("w-1.5 h-1.5 rounded-full", model.featured ? "bg-white/40" : "bg-black/20")} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={model.featured ? 'outline' : 'primary'} 
                className={model.featured ? "w-full !px-8 !py-3.5 !text-xs" : "w-full"}
                asChild
              >
                <Link href="/contact">Inquire</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
