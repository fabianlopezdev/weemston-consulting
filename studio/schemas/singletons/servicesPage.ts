import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO (optional)',
      type: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Services',
    },
    defineLanguageField(),
    {
      name: 'hero',
      title: 'Hero Section (optional)',
      type: 'heroSection',
      description: 'Main hero section at the top of the services page',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      description: 'Introduction text displayed before the services list',
      rows: 4,
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Select and order the services to display on this page',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'Services Page',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
