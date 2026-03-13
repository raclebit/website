'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const WhatWeDo = () => {
  const labelRef = useScrollReveal('fadeLeft')
  const cardsRef = useScrollReveal('stagger')
  
  const features = [
    { num: '01', title: 'Scalable System Architecture', desc: 'We design blueprints that can handle 10x growth without crumbling. Foundation-first approach to complex applications.' },
    { num: '02', title: 'Reliable Workflows & Integrations', desc: 'Connecting fragmented tools into unified, automated pipelines. Zero data loss, zero human error.' },
    { num: '03', title: 'Maintainable Codebases', desc: 'Clean, documented, and strongly typed engineering. Built for your future internal team to take over seamlessly.' },
  ]

  return (
    <section className="py-32 bg-white text-black">
      <div className="container mx-auto px-6">
        <div ref={labelRef} className="text-sm uppercase tracking-widest text-gray-500 mb-6">What We Do</div>
        <h2 className="text-4xl md:text-5xl font-heading mb-20 tracking-tight">
          <AnimatedText text="What We Do" />
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card flex flex-col border-b border-gray-200 pb-12 group">
              <span className="font-heading font-bold text-6xl text-gray-200 mb-8 transition-colors duration-500 group-hover:text-black">
                {feature.num}
              </span>
              <h3 className="font-heading text-2xl mb-4">{feature.title}</h3>
              <p className="font-sans text-gray-600 leading-relaxed mt-auto">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}