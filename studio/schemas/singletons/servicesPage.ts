import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Search Results Description (optional)',
      description:
        'If left empty, search engines will extract the description from page content.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'ogImage',
      title: 'Social Media Preview Image (optional)',
      description:
        'Also called OG Image. The image shown when this page is shared on social media. If left empty, social media platforms may show no preview image or extract one from the page.',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used as the SEO title in search results.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Services',
    },
    {
      name: 'metaDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description:
        'The short preview text that appears under your title in Google search results. Keep it under 160 characters.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Image',
      type: 'image',
      fieldset: 'ogImage',
      description: 'Recommended size: 1200×630 pixels.',
      options: { hotspot: true },
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
