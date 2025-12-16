import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fieldsets: [
    {
      name: 'homepage',
      title: '🏠 Homepage Display',
      description:
        'Content shown when this service is featured on the homepage',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'servicesPage',
      title: '📋 Services Page Display',
      description: 'How this service appears on the dedicated services page',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'listSection',
      title: 'List Section',
      description: 'Optional bulleted list to highlight key offerings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    defineLanguageField(),

    // Homepage Fields
    {
      name: 'homepageText',
      title: 'Homepage Text',
      type: 'portableText',
      fieldset: 'homepage',
      description:
        'Text to display when this service is featured on the homepage',
    },

    // Services Page Fields
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      fieldset: 'servicesPage',
      description:
        'Small uppercase label above the title (e.g., "01", "Strategy")',
    },
    {
      name: 'leadText',
      title: 'Lead Text',
      type: 'text',
      rows: 2,
      fieldset: 'servicesPage',
      description: 'Bold introductory text below the title',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'servicesPage',
      description: 'Main body text for this service',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Settings (Gear)', value: 'settings' },
          { title: 'Target', value: 'target' },
          { title: 'Users (Team)', value: 'users' },
          { title: 'Chart (Analytics)', value: 'chart' },
          { title: 'Lightbulb (Ideas)', value: 'lightbulb' },
          { title: 'Handshake', value: 'handshake' },
          { title: 'Compass', value: 'compass' },
          { title: 'Calendar', value: 'calendar' },
          { title: 'Presentation', value: 'presentation' },
        ],
      },
      initialValue: 'settings',
    },
    {
      name: 'imagePosition',
      title: 'Image/Icon Position',
      type: 'string',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Cream', value: 'cream' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'white',
    },

    // List Section
    {
      name: 'listStyle',
      title: 'List Style',
      type: 'string',
      fieldset: 'listSection',
      options: {
        list: [
          { title: 'Checkmark', value: 'checkmark' },
          { title: 'Arrow', value: 'arrow' },
          { title: 'Bullet', value: 'bullet' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'checkmark',
    },
    {
      name: 'listTitle',
      title: 'List Title',
      type: 'string',
      fieldset: 'listSection',
      description: 'Optional heading above the list (e.g., "Key Offerings")',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      fieldset: 'listSection',
      of: [{ type: 'string' }],
      description: 'Individual items in the list',
    },

    // Case Studies Link
    {
      name: 'caseStudiesLinkText',
      title: 'Case Studies Link Text',
      type: 'string',
      description:
        'Text for the link to related case studies (e.g., "View our work")',
    },
    {
      name: 'caseStudiesLink',
      title: 'Case Studies Link',
      type: 'link',
      description: 'Where the case studies link goes',
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
  orderings: [
    {
      title: 'Manual Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      tag: 'tag',
      language: 'language',
    },
    prepare({ title, tag, language }) {
      return {
        title,
        subtitle: [tag, language?.toUpperCase()].filter(Boolean).join(' • '),
      };
    },
  },
});
