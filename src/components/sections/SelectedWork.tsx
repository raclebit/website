'use client'

import React from 'react'
import Link from 'next/link'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

interface SelectedWorkProps {
  caseStudies: any[]
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ caseStudies }) => {
  const cardsRef = useScrollReveal('stagger')

  return (
    <section className="py-32 bg-[#FAFAFA] text-black">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20 border-b border-gray-200 pb-8">
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight">
            <AnimatedText text="Selected Work" />
          </h2>
          <Link href="/case-studies" className="font-sans font-medium text-sm hover:opacity-70 transition-opacity flex items-center gap-2">
            View All Projects
            <span className="text-lg">→</span>
          </Link>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const imageUrl = study.coverImage && typeof study.coverImage === 'object' ? (study.coverImage as any).url : undefined
            const industryLabel = study.industry && typeof study.industry === 'object' ? study.industry.name : study.industry
            
            return (
              <div key={idx} className="work-card-wrapper">
                <CaseStudyCard 
                  slug={study.slug}
                  title={study.title}
                  industry={industryLabel as string}
                  metric={study.resultMetric}
                  imageUrl={imageUrl}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
