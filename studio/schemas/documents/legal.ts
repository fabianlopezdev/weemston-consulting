import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'legal',
  title: 'Legal Page',
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
      name: 'content',
      title: 'Content (optional)',
      type: 'portableText',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, language, lastUpdated }) {
      return {
        title,
        subtitle: `${language.toUpperCase()} • Updated ${new Date(lastUpdated).toLocaleDateString()}`,
      };
    },
  },
});
