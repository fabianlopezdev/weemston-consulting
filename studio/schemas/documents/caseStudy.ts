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
      name: 'description',
      title: 'Description',
      type: 'portableText',
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
