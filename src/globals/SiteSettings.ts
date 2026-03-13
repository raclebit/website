import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Raclebit',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'We Build Digital Systems That Last.',
    },
    {
      name: 'logoLight',
      label: 'Logo (Light — Background Putih)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload logo versi gelap (hitam) untuk digunakan di navbar dan area background putih. Format: SVG atau PNG transparan. Ukuran disarankan: minimal 240x64px.',
      }
    },
    {
      name: 'logoDark',
      label: 'Logo (Dark — Background Hitam)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload logo versi terang (putih) untuk digunakan di footer dan area background hitam. Format: SVG atau PNG transparan. Ukuran disarankan: minimal 240x64px.',
      }
    },
    {
      name: 'logoAlt',
      label: 'Logo Alt Text',
      type: 'text',
      defaultValue: 'Raclebit',
    },
    {
      name: 'favicon',
      label: 'Favicon (SVG atau ICO)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'contact@raclebit.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+62 878 5665 5558',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      defaultValue: '@raclebit',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      defaultValue: 'https://linkedin.com/company/raclebit',
    },
    {
      name: 'footerText',
      type: 'richText',
    },
  ],
}