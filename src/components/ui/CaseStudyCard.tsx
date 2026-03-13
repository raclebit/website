import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  slug: string
  title: string
  industry: string
  metric?: string | null
  imageUrl?: string
  className?: string
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ slug, title, industry, metric, imageUrl, className }) => {
  return (
    <Link href={`/case-studies/${slug}`} className={cn("group block w-full", className)}>
      <div className="relative w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-wider text-gray-500 font-semibold">{industry}</span>
        <h3 className="font-heading text-2xl group-hover:text-black/70 transition-colors">{title}</h3>
        {metric && (
          <p className="font-sans text-sm text-black mt-2 font-medium bg-gray-100 self-start px-3 py-1 rounded-sm">
            {metric}
          </p>
        )}
      </div>
    </Link>
  )
}