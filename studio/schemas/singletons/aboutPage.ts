import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      initialValue: 'About',
    },
    defineLanguageField(),
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      description: 'Main hero section at the top of the about page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections (optional)',
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
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'About Page',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
