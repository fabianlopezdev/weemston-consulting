import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'box', title: 'Box', default: true },
    { name: 'details', title: 'Case Study Details' },
  ],
  fields: [
    // === BOX TAB ===
    // These fields control how the case study appears in the grid
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      group: 'box',
      description:
        'Logo displayed in the grid box. If not provided, the client name will be shown instead.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the logo for screen readers',
        },
      ],
    },
    {
      name: 'logoVariant',
      title: 'Logo Color',
      type: 'string',
      group: 'box',
      options: {
        list: [
          { title: 'Dark logo', value: 'dark' },
          { title: 'Light logo', value: 'light' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'dark',
      description:
        'Is the logo dark or light? This helps display it correctly on different backgrounds.',
      hidden: ({ parent }) => !parent?.clientLogo,
    },

    // === CASE STUDY DETAILS TAB ===
    // Content shown in the modal when user clicks a box
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
      description: 'The client or company name',
      validation: (Rule) => Rule.required().error('Client name is required'),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      group: 'details',
      description: 'A short tagline or subtitle for this case study',
    },
    {
      name: 'date',
      title: 'Date / Timeline',
      type: 'string',
      group: 'details',
      description: 'Project timeline (e.g., "MARCH 2024 - PRESENT")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'details',
      description: 'Summary explaining the project scope',
    },
    {
      name: 'contributionsTitle',
      title: 'Contributions Section Title',
      type: 'string',
      group: 'details',
      description: 'Title for the contributions list',
      initialValue: 'KEY CONTRIBUTIONS',
    },
    {
      name: 'contributions',
      title: 'Key Contributions',
      type: 'array',
      group: 'details',
      of: [{ type: 'text', rows: 2 }],
      description: 'List of specific achievements or deliverables',
    },
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      group: 'details',
      to: [{ type: 'service' }],
      description: 'Link this case study to a service',
    },
    { ...defineLanguageField(), group: 'details' },
  ],
  orderings: [
    {
      title: 'Client Name',
      name: 'clientAsc',
      by: [{ field: 'client', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'client',
      language: 'language',
      media: 'clientLogo',
    },
    prepare({ title, language, media }) {
      return {
        title: title || 'New Case Study',
        subtitle: language?.toUpperCase() || '',
        media,
      };
    },
  },
});
