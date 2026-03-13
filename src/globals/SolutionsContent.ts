import type { GlobalConfig } from 'payload'

export const SolutionsContent: GlobalConfig = {
  slug: 'solutions-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'engagementModels',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'text', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'industries',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'coreFocus',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' }
      ]
    }
  ],
}