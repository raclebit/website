import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  slug: string
  title: string
  excerpt?: string | null
  category: string
  publishedAt?: string | null
  imageUrl?: string
  className?: string
}

export const BlogCard: React.FC<BlogCardProps> = ({ slug, title, excerpt, category, publishedAt, imageUrl, className }) => {
  return (
    <Link href={`/blog/${slug}`} className={cn("group block w-full border border-gray-200 hover:border-black transition-colors duration-300 bg-white flex flex-col h-full", className)}>
      <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-sans text-xs uppercase tracking-wider text-black bg-gray-100 px-3 py-1 rounded-full font-medium">
            {category}
          </span>
          {publishedAt && (
            <span className="font-sans text-xs text-gray-400">
              {formatDate(publishedAt)}
            </span>
          )}
        </div>
        
        <h3 className="font-heading text-2xl mb-4 group-hover:text-black/70 transition-colors line-clamp-2">
          {title}
        </h3>
        
        {excerpt && (
          <p className="font-sans text-sm text-gray-500 line-clamp-3 mb-8">
            {excerpt}
          </p>
        )}

        <div className="mt-auto font-sans font-medium text-sm flex items-center gap-2">
          Read Article
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  )
}