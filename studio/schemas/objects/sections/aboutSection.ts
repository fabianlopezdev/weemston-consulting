import { defineType } from 'sanity';

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this section on the homepage',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Us',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'showTitle',
      title: 'Show Title',
      type: 'boolean',
      initialValue: true,
      description:
        'When disabled, the title remains in the HTML for SEO and screen readers but is hidden visually',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Content is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'images',
      title: 'Image Gallery (optional)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Required for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      imagesCount: 'images.length',
    },
    prepare({ title, enabled, imagesCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'About';
      const subtitle = enabled
        ? `${imagesCount || 0} image${imagesCount !== 1 ? 's' : ''}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
