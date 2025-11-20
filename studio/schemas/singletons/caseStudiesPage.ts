import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
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
      initialValue: 'Case Studies',
    },
    defineLanguageField(),
    {
      name: 'hero',
      title: 'Hero Section (optional)',
      type: 'heroSection',
      description: 'Main hero section at the top of the case studies page',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      description: 'Introduction text displayed before the case studies list',
      rows: 4,
    },
    {
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      description: 'Select and order the case studies to display on this page',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
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
        title: title || 'Case Studies Page',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
