export const dynamic = 'force-dynamic'
export const revalidate = 0
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const metadata = {
  title: 'Case Studies',
  description: 'Selected work and technical achievements by Raclebit.',
}

export default async function CaseStudiesPage() {
  const payload = await getPayloadClient()

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-32">
      <div className="container mx-auto px-6">
        <h1 className="mb-16">
          <AnimatedText text="Selected Work" className="text-5xl md:text-7xl font-heading tracking-tighter" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
          {caseStudies.map((study, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const imageUrl = study.coverImage && typeof study.coverImage === 'object' ? (study.coverImage as any).url : undefined
            const industryLabel = study.industry && typeof study.industry === 'object' ? study.industry.name : study.industry
            
            return (
              <CaseStudyCard 
                key={idx}
                slug={study.slug || ""}
                title={study.title}
                industry={industryLabel as string}
                metric={study.resultMetric}
                imageUrl={imageUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
