import { defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'The primary headline for this page',
    },
    {
      name: 'headingColor',
      title: 'Heading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'tagline',
      title: 'Tagline (optional)',
      type: 'string',
      description: 'Secondary headline below the main heading',
    },
    {
      name: 'taglineColor',
      title: 'Tagline Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'subheading',
      title: 'Intro Paragraph (optional)',
      type: 'text',
      rows: 3,
      description: 'Supporting paragraph text below the subheading',
    },
    {
      name: 'subheadingColor',
      title: 'Intro Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button (optional)',
      type: 'link',
      description: 'Primary action button',
    },
    {
      name: 'showBackgroundImage',
      title: 'Show Background Image',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show or hide the background image',
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
