import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    defineLanguageField(),
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'industry',
      title: 'Industry (optional)',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured (optional)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'mainImage',
      title: 'Main Image (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'challenge',
      title: 'The Challenge (optional)',
      type: 'portableText',
    },
    {
      name: 'solution',
      title: 'The Solution (optional)',
      type: 'portableText',
    },
    {
      name: 'results',
      title: 'The Results (optional)',
      type: 'portableText',
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial (optional)',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote (optional)',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author Name (optional)',
          type: 'string',
        },
        {
          name: 'position',
          title: 'Author Position (optional)',
          type: 'string',
        },
      ],
    },
    {
      name: 'gallery',
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
    },
    {
      name: 'seo',
      title: 'SEO (optional)',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      language: 'language',
      media: 'mainImage',
    },
    prepare({ title, client, language, media }) {
      return {
        title,
        subtitle: `${client} • ${language.toUpperCase()}`,
        media,
      };
    },
  },
});
