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
    defineLanguageField(),
    {
      name: 'homepageText',
      title: 'Homepage Text',
      type: 'portableText',
      description:
        'Text to display when this service is featured on the homepage',
    },
    {
      name: 'content',
      title: 'Content (optional)',
      type: 'portableText',
    },
    {
      name: 'featuredCaseStudies',
      title: 'Featured Case Studies (optional)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      description: 'Select case studies to feature with this service',
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title,
        subtitle: language.toUpperCase(),
      };
    },
  },
});
