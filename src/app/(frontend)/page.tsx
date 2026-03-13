import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { EngagementModels } from '@/components/sections/EngagementModels'
import { InsightsStrip } from '@/components/sections/InsightsStrip'
import { CTASection } from '@/components/sections/CTASection'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    where: {
      _status: { equals: 'published' },
      featured: { equals: true },
    },
    limit: 3,
    depth: 1,
  })

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      _status: { equals: 'published' },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <>
      <Hero />
      <Marquee />
      <WhatWeDo />
      <SelectedWork caseStudies={caseStudies} />
      <HowWeWork />
      <EngagementModels />
      <InsightsStrip posts={posts} />
      <CTASection />
    </>
  )
}