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

import { AdminLogo } from './components/admin/AdminLogo'
import { AdminIcon } from './components/admin/AdminIcon'

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
    },
  }),
  collections: [Users, Media, Industries, CaseStudies, BlogPosts],
  globals: [SiteSettings, SolutionsContent],
  cors: ['http://localhost:3000'],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})