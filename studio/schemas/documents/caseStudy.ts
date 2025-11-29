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
      description:
        'For best performance, use WebP format. Convert at anywebp.com or squoosh.app',
      options: {
        hotspot: true,
      },
      fieldsets: [
        {
          name: 'seoFilename',
          title: 'SEO Filename (optional)',
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the image for screen readers and search engines. Be specific (e.g., "Acme Corp website redesign showcasing new homepage"). Include relevant keywords naturally.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'Custom Filename',
          type: 'string',
          description:
            'Improves image SEO by giving Google a descriptive filename (e.g., "acme-corp-case-study" instead of "IMG_1234"). Use lowercase with hyphens, no spaces or special characters.',
          fieldset: 'seoFilename',
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
