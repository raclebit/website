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
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 15000,
      allowExitOnIdle: true,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  collections: [Users, Media, Industries, CaseStudies, BlogPosts],
  globals: [SiteSettings, SolutionsContent],
  cors: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://website-production-e105.up.railway.app',
    'https://raclebit.com',
    'https://www.raclebit.com',
    'https://company.raclebit.com',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET || 'unsecure-build-secret',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})