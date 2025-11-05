import { defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Show hero section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show the hero section',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small text above the main heading',
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'The primary headline of your homepage',
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the main heading',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'link',
      description: 'Primary action button',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
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
      ],
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      tagline: 'tagline',
      enabled: 'enabled',
      media: 'backgroundImage',
    },
    prepare({ heading, tagline, enabled, media }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = heading || 'Hero Section';
      const subtitle = enabled ? tagline || 'Hero section' : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
        media,
      };
    },
  },
});
