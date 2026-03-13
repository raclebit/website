export const dynamic = 'force-dynamic'
export const revalidate = 0
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { BlogCard } from '@/components/ui/BlogCard'
import { AnimatedText } from '@/components/ui/AnimatedText'

export const metadata = {
  title: 'Blog & Insights',
  description: 'Our thinking on architecture, workflows, and digital products.',
}

export default async function BlogPage() {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      _status: { equals: 'published' },
    },
    depth: 2,
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black pt-32 pb-32">
      <div className="container mx-auto px-6">
        <h1 className="mb-16">
          <AnimatedText text="Our Thinking" className="text-5xl md:text-7xl font-heading tracking-tighter" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {posts.map((post, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const imageUrl = post.coverImage && typeof post.coverImage === 'object' ? (post.coverImage as any).url : undefined
            
            return (
              <BlogCard 
                key={idx}
                slug={post.slug || ""}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category || ""}
                publishedAt={post.publishedAt}
                imageUrl={imageUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
