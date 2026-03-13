import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const payload = await getPayloadClient()

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    where: { _status: { equals: 'published' } },
  })

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: { _status: { equals: 'published' } },
  })

  const routes = [
    '',
    '/about',
    '/solutions',
    '/case-studies',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
  }))

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }))

  return [...routes, ...caseStudyRoutes, ...postRoutes]
}