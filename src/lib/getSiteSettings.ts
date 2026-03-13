import { getPayloadClient } from './payload'

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 2,
  })
  return settings
}