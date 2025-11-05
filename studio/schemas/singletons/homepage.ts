import { defineType } from 'sanity';
import { supportedLanguages, baseLanguage } from '../../lib/i18n';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Home',
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
      readOnly: true,
      description: 'Language for this homepage version',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      description: 'Main hero section at the top of the homepage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description:
        'Drag to reorder sections. Toggle enabled/disabled for each section.',
      of: [
        { type: 'featuredServicesSection' },
        { type: 'featuredCaseStudiesSection' },
        { type: 'testimonialsSection' },
        { type: 'faqSection' },
        { type: 'aboutSection' },
      ],
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
    },
    prepare({ title, language }) {
      return {
        title: title || 'Homepage',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
