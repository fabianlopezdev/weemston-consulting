import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position (optional)',
      type: 'string',
      description: 'Job title or role',
    },
    {
      name: 'company',
      title: 'Company (optional)',
      type: 'string',
      description: 'Company or organization name',
    },
    {
      name: 'websiteUrl',
      title: 'Website URL (optional)',
      type: 'url',
      description:
        'Link to company website - if provided, company name will be clickable',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The testimonial text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar (optional)',
      type: 'image',
      description:
        'Photo of the person. For best performance, use WebP format. Convert at anywebp.com or squoosh.app',
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
            'Describes the image for screen readers and search engines. Be specific (e.g., "John Smith, CEO of Acme Corp"). Include relevant keywords naturally.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'Custom Filename',
          type: 'string',
          description:
            'Improves image SEO by giving Google a descriptive filename (e.g., "john-smith-testimonial" instead of "IMG_1234"). Use lowercase with hyphens, no spaces or special characters.',
          fieldset: 'seoFilename',
        },
      ],
    },
    defineLanguageField(),
    {
      name: 'featured',
      title: 'Featured (optional)',
      type: 'boolean',
      description: 'Mark as featured to easily filter testimonials',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      company: 'company',
      language: 'language',
      media: 'avatar',
    },
    prepare({ name, position, company, language, media }) {
      const subtitle = company ? `${position} at ${company}` : position;
      return {
        title: name,
        subtitle: `${subtitle} • ${language.toUpperCase()}`,
        media,
      };
    },
  },
});
