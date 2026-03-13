import React from 'react'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { Philosophy } from '@/components/sections/about/Philosophy'
import { VisionMission } from '@/components/sections/about/VisionMission'
import { BrandValues } from '@/components/sections/about/BrandValues'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CTASection } from '@/components/sections/CTASection'

export const metadata = {
  title: 'About Us',
  description: 'We believe digital products should be engineered, not improvised.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Philosophy />
      <VisionMission />
      <BrandValues />
      <HowWeWork />
      <CTASection />
    </>
  )
}