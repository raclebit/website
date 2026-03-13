'use client'

import React from 'react'
import Link from 'next/link'
import { BlogCard } from '@/components/ui/BlogCard'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

interface InsightsStripProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[]
}

export const InsightsStrip: React.FC<InsightsStripProps> = ({ posts }) => {
  const cardsRef = useScrollReveal('blurUp', { stagger: 0.12 })

  return (
    <section className="py-32 bg-white text-black border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight">
            <AnimatedText text="Our Thinking" />
          </h2>
          <Link href="/blog" className="font-sans font-medium text-sm hover:opacity-70 transition-opacity flex items-center gap-2">
            View All Insights
            <span className="text-lg">→</span>
          </Link>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const imageUrl = post.coverImage && typeof post.coverImage === 'object' ? (post.coverImage as any).url : undefined
            return (
              <BlogCard 
                key={idx}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                publishedAt={post.publishedAt}
                imageUrl={imageUrl}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}