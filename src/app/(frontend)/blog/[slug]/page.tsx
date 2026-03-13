import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatDate } from '@/lib/utils'
import { CTASection } from '@/components/sections/CTASection'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
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
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = docs[0]
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt || `Read article ${post.title}`,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = docs[0]
  if (!post) return notFound()

  const imageUrl = post.coverImage && typeof post.coverImage === 'object' ? (post.coverImage as any).url : undefined

  return (
    <article className="bg-white text-black pt-32">
      <div className="container mx-auto px-6 mb-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-sans text-sm uppercase tracking-wider text-black bg-gray-100 px-4 py-1.5 rounded-full font-medium">
            {post.category}
          </span>
          {post.publishedAt && (
            <span className="font-sans text-sm text-gray-500">
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.author && (
            <span className="font-sans text-sm text-gray-500">
              · By {post.author}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-heading tracking-tight leading-[1.1] mb-8">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="font-sans text-xl text-gray-600 leading-relaxed border-l-2 border-black pl-6">
            {post.excerpt}
          </p>
        )}
      </div>

      {imageUrl && (
        <div className="container mx-auto px-6 mb-24 max-w-5xl">
          <div className="w-full aspect-[21/9] relative overflow-hidden bg-gray-100">
            <Image 
              src={imageUrl} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 pb-32 max-w-3xl">
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-headings:font-medium prose-p:font-sans prose-p:text-gray-700">
          <RichText data={post.content as any} />
        </div>
      </div>
      <CTASection />
    </article>
  )
}