import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'service',
  title: 'Service',
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
      name: 'description',
      title: 'Short Description (optional)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'icon',
      title: 'Icon (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'features',
      title: 'Key Features (optional)',
      type: 'array',
      of: [{ type: 'string' }],
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
      media: 'icon',
    },
    prepare({ title, language, media }) {
      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      };
    },
  },
});
