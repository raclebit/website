export const dynamic = 'force-dynamic'
export const revalidate = 0
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { SolutionsHero } from '@/components/sections/solutions/SolutionsHero'
import { EngagementModels } from '@/components/sections/EngagementModels'
import { Industries } from '@/components/sections/solutions/Industries'
import { CoreFocus } from '@/components/sections/solutions/CoreFocus'
import { CTASection } from '@/components/sections/CTASection'

export const metadata = {
  title: 'Solutions',
  description: 'Scalable system architecture, reliable workflows, and maintainable codebases.',
}

export default async function SolutionsPage() {
  const payload = await getPayloadClient()

  const solutionsContent = await payload.findGlobal({
    slug: 'solutions-content',
  })

  // Fallback data if CMS is empty
  const industries = solutionsContent?.industries?.length ? solutionsContent.industries : [
    { name: 'Financial Services', description: 'Secure, high-throughput systems for fintech.' },
    { name: 'E-Commerce', description: 'Scalable inventory and checkout architectures.' },
    { name: 'Professional Services', description: 'Automated workflows and resource planning.' },
    { name: 'SaaS & Startups', description: 'Rapid, reliable product development blueprints.' },
  ]

  const focus = solutionsContent?.coreFocus?.length ? solutionsContent.coreFocus : [
    { title: 'Scalable System Architecture', description: 'Designing technical foundations that handle 10x growth without crumbling.' },
    { title: 'Reliable Workflows & Integrations', description: 'Connecting fragmented tools into unified pipelines with zero data loss.' },
    { title: 'Maintainable Codebases', description: 'Clean, documented engineering built for your future team.' },
    { title: 'Operational Efficiency', description: 'Automating redundant tasks to save thousands of hours.' },
    { title: 'Long-term Sustainability', description: 'Eliminating technical debt before it becomes a business liability.' },
  ]

  return (
    <>
      <SolutionsHero />
      <EngagementModels />
      <Industries industries={industries} />
      <CoreFocus focus={focus} />
      <CTASection />
    </>
  )
}
