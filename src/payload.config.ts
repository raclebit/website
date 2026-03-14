import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Industries } from './collections/Industries'
import { CaseStudies } from './collections/CaseStudies'
import { BlogPosts } from './collections/BlogPosts'
import { SiteSettings } from './globals/SiteSettings'
import { SolutionsContent } from './globals/SolutionsContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo#AdminLogo',
        Icon: '/components/admin/AdminIcon#AdminIcon',
      },
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      min: 0,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    },
  }),
  collections: [Users, Media, Industries, CaseStudies, BlogPosts],
  globals: [SiteSettings, SolutionsContent],
  cors: ['http://localhost:3000'],
  secret: process.env.PAYLOAD_SECRET || 'unsecure-build-secret',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})