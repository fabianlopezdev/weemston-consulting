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
