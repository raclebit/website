import { getPayload } from 'payload'
import configPromise from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  payload.logger.info('Seeding database...')

  // Create Admin
  const adminExists = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@raclebit.com' } }
  })

  if (adminExists.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@raclebit.com',
        password: 'admin',
      },
    })
    payload.logger.info('Admin user created')
  }

  // Create SiteSettings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Raclebit',
      tagline: 'We Build Digital Systems That Last.',
      contactEmail: 'contact@raclebit.com',
      contactPhone: '+62 878 5665 5558',
      instagramHandle: '@raclebit',
      linkedinUrl: 'https://linkedin.com/company/raclebit',
    },
  })
  payload.logger.info('Site settings updated')

  // Create SolutionsContent
  await payload.updateGlobal({
    slug: 'solutions-content',
    data: {
      engagementModels: [
        {
          title: 'Project-Based Development',
          description: 'End-to-end development of custom applications.',
          features: [{ text: 'Fixed scope' }, { text: 'Dedicated team' }]
        },
      ],
      industries: [
        { name: 'Financial Services', description: 'Secure systems for fintech.' },
        { name: 'E-Commerce', description: 'Scalable inventory architectures.' },
      ],
      coreFocus: [
        { title: 'Scalable System Architecture', description: 'Handle 10x growth.' },
      ]
    },
  })
  payload.logger.info('Solutions content updated')

  // Create Industries
  const industriesCount = await payload.find({ collection: 'industries' })
  let finServiceId: any = null
  let ecomServiceId: any = null

  if (industriesCount.totalDocs === 0) {
    const finService = await payload.create({
      collection: 'industries',
      data: {
        name: 'Financial Services',
        slug: 'financial-services',
        icon: 'briefcase',
        order: 1,
        active: true,
      }
    })
    finServiceId = finService.id

    const ecomService = await payload.create({
      collection: 'industries',
      data: {
        name: 'E-Commerce & Logistics',
        slug: 'ecommerce-logistics',
        icon: 'shopping-cart',
        order: 2,
        active: true,
      }
    })
    ecomServiceId = ecomService.id

    await payload.create({
      collection: 'industries',
      data: {
        name: 'Professional Services',
        slug: 'professional-services',
        icon: 'users',
        order: 3,
        active: true,
      }
    })
    
    await payload.create({
      collection: 'industries',
      data: {
        name: 'SaaS & Startups',
        slug: 'saas-startups',
        icon: 'code',
        order: 4,
        active: true,
      }
    })
    payload.logger.info('Industries created')
  } else {
    const fin = await payload.find({ collection: 'industries', where: { slug: { equals: 'financial-services' } }})
    finServiceId = fin.docs[0]?.id
    
    const ecom = await payload.find({ collection: 'industries', where: { slug: { equals: 'ecommerce-logistics' } }})
    ecomServiceId = ecom.docs[0]?.id
  }

  // Create Case Studies
  const caseStudiesCount = await payload.find({ collection: 'case-studies' })
  if (caseStudiesCount.totalDocs === 0) {
    await payload.create({
      collection: 'case-studies',
      data: {
        title: 'Financial Services Automation',
        slug: 'financial-services-automation',
        industry: finServiceId,
        resultMetric: '70% faster processing',
        technologies: [{ name: 'Next.js' }, { name: 'PostgreSQL' }],
        featured: true,
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
    await payload.create({
      collection: 'case-studies',
      data: {
        title: 'E-Commerce Inventory Sync',
        slug: 'ecommerce-inventory-sync',
        industry: ecomServiceId,
        resultMetric: '99.2% inventory accuracy',
        technologies: [{ name: 'Node.js' }, { name: 'Redis' }],
        featured: true,
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
    payload.logger.info('Case studies created')
  }

  // Create Blog Posts
  const blogPostsCount = await payload.find({ collection: 'blog-posts' })
  if (blogPostsCount.totalDocs === 0) {
    await payload.create({
      collection: 'blog-posts',
      data: {
        title: 'Why Most Internal Systems Fail',
        slug: 'why-most-internal-systems-fail',
        category: 'insights',
        excerpt: 'Architectural pitfalls that hold companies back.',
        author: 'Raclebit Engineering',
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
    payload.logger.info('Blog posts created')
  }

  payload.logger.info('Seeding complete!')
  process.exit(0)
}

seed().catch(console.error)