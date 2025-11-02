import { defineType } from 'sanity';
import { supportedLanguages, baseLanguage } from '../../lib/i18n';

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
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: supportedLanguages.map((lang) => ({
          title: lang.title,
          value: lang.id,
        })),
      },
      initialValue: baseLanguage?.id,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      name: 'seo',
      title: 'SEO',
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
