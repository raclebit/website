import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { CTASection } from '@/components/sections/CTASection'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    limit: 100,
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const study = docs[0]
  if (!study) return {}

  return {
    title: study.title,
    description: study.resultMetric || `Case study on ${study.title}`,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const study = docs[0]
  if (!study) return notFound()

  const imageUrl = study.coverImage && typeof study.coverImage === 'object' ? (study.coverImage as any).url : undefined
  const industryLabel = study.industry && typeof study.industry === 'object' ? study.industry.name : study.industry

  return (
    <article className="bg-white text-black pt-32">
      <div className="container mx-auto px-6 mb-16">
        <div className="mb-8">
          <span className="font-sans text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4 block">
            {industryLabel as string}
          </span>
          <h1 className="text-5xl md:text-7xl font-heading tracking-tight leading-[1.1] max-w-4xl">
            {study.title}
          </h1>
        </div>

        {study.resultMetric && (
          <div className="inline-block bg-[#1B1B1B] text-[#FAFAFA] px-6 py-3 font-sans text-lg mb-12">
            Result: {study.resultMetric}
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="w-full aspect-[21/9] md:aspect-[3/1] relative mb-24 overflow-hidden bg-gray-100">
          <Image 
            src={imageUrl} 
            alt={study.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="sticky top-32">
              <h3 className="font-heading text-xl mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {study.technologies?.map((tech: any, idx: number) => (
                  <span key={idx} className="border border-gray-200 px-3 py-1 font-sans text-sm text-gray-600">
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8 prose prose-lg max-w-none">
            {study.problem && (
              <div className="mb-16">
                <h2 className="font-heading text-3xl mb-6">The Problem</h2>
                <div className="font-sans text-gray-700 leading-relaxed">
                  <RichText data={study.problem as any} />
                </div>
              </div>
            )}

            {study.solution && (
              <div className="mb-16">
                <h2 className="font-heading text-3xl mb-6">The Solution</h2>
                <div className="font-sans text-gray-700 leading-relaxed">
                  <RichText data={study.solution as any} />
                </div>
              </div>
            )}

            {study.result && (
              <div className="mb-16">
                <h2 className="font-heading text-3xl mb-6">The Result</h2>
                <div className="font-sans text-gray-700 leading-relaxed">
                  <RichText data={study.result as any} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CTASection />
    </article>
  )
}