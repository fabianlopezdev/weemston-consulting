import { defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small text above the main heading',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'The primary headline of your homepage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading (optional)',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the main heading',
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button (optional)',
      type: 'link',
      description: 'Primary action button',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image (optional)',
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
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      tagline: 'tagline',
      media: 'backgroundImage',
    },
    prepare({ heading, tagline, media }) {
      return {
        title: heading || 'Hero Section',
        subtitle: tagline || 'Hero section',
        media,
      };
    },
  },
});
