import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author (optional)',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'categories',
      title: 'Categories (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
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
      name: 'excerpt',
      title: 'Excerpt (optional)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'content',
      title: 'Content (optional)',
      type: 'portableText',
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
      language: 'language',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, language, media, publishedAt }) {
      return {
        title,
        subtitle: `${language.toUpperCase()} • ${new Date(publishedAt).toLocaleDateString()}`,
        media,
      };
    },
  },
});
