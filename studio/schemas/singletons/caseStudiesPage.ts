import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
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
    {
      name: 'heroFields',
      title: '🎯 Hero Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'introFields',
      title: '📝 Intro Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'filterFields',
      title: '🔍 Filter Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'caseStudiesFields',
      title: '📋 Case Studies',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'intro', title: 'Intro' },
    { name: 'filter', title: 'Filter' },
    { name: 'caseStudies', title: 'Case Studies' },
  ],
  fields: [
    // Page Title (SEO)
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used as the SEO title in search results.',
      initialValue: 'Case Studies',
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

    // Hero Section
    {
      name: 'heroBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'heroBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 90,
      hidden: ({ parent }) => parent?.heroBackgroundColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'heroBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }) => parent?.heroBackgroundColorType !== 'custom',
    },
    {
      name: 'heroHeading',
      title: 'Heading',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description: 'Main heading text',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description: 'Text within heading to italicize (optional)',
    },
    {
      name: 'heroHighlightColorType',
      title: 'Highlight Color',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.heroHeadingHighlight,
    },
    {
      name: 'heroHighlightColorShade',
      title: 'Highlight Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.heroHeadingHighlight ||
        parent?.heroHighlightColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'heroHighlightCustomColor',
      title: 'Custom Highlight Color',
      type: 'simplerColor',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }) =>
        !parent?.heroHeadingHighlight ||
        parent?.heroHighlightColorType !== 'custom',
    },
    {
      name: 'heroShowDivider',
      title: 'Show Divider',
      type: 'boolean',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: true,
    },
    {
      name: 'heroDividerColorType',
      title: 'Divider Color',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'secondary',
      hidden: ({ parent }) => !parent?.heroShowDivider,
    },
    {
      name: 'heroDividerColorShade',
      title: 'Divider Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.heroShowDivider || parent?.heroDividerColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'heroDividerCustomColor',
      title: 'Custom Divider Color',
      type: 'simplerColor',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }) =>
        !parent?.heroShowDivider || parent?.heroDividerColorType !== 'custom',
    },
    {
      name: 'heroTagline',
      title: 'Tagline',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description: 'Subtitle text below heading',
    },
    {
      name: 'heroTaglineColor',
      title: 'Tagline Color',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'muted',
      hidden: ({ parent }) => !parent?.heroTagline,
    },

    // Intro Section
    {
      name: 'introTitle',
      title: 'Title',
      type: 'string',
      group: 'intro',
      fieldset: 'introFields',
      description: 'Section title (e.g., "Our Work")',
    },
    {
      name: 'introDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'intro',
      fieldset: 'introFields',
      description: 'Description paragraph',
    },
    {
      name: 'introTitleColorType',
      title: 'Title Color',
      type: 'string',
      group: 'intro',
      fieldset: 'introFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.introTitle,
    },
    {
      name: 'introTitleColorShade',
      title: 'Title Shade',
      type: 'number',
      group: 'intro',
      fieldset: 'introFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.introTitle || parent?.introTitleColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'introTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'intro',
      fieldset: 'introFields',
      hidden: ({ parent }) =>
        !parent?.introTitle || parent?.introTitleColorType !== 'custom',
    },
    {
      name: 'introDescriptionColor',
      title: 'Description Color',
      type: 'string',
      group: 'intro',
      fieldset: 'introFields',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.introDescription,
    },
    {
      name: 'introFooter',
      title: 'Footer',
      type: 'string',
      group: 'intro',
      fieldset: 'introFields',
      description: 'Italic footer text below description',
    },
    {
      name: 'introFooterColorType',
      title: 'Footer Color',
      type: 'string',
      group: 'intro',
      fieldset: 'introFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.introFooter,
    },
    {
      name: 'introFooterColorShade',
      title: 'Footer Shade',
      type: 'number',
      group: 'intro',
      fieldset: 'introFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.introFooter || parent?.introFooterColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'introFooterCustomColor',
      title: 'Custom Footer Color',
      type: 'simplerColor',
      group: 'intro',
      fieldset: 'introFields',
      hidden: ({ parent }) =>
        !parent?.introFooter || parent?.introFooterColorType !== 'custom',
    },

    // Filter Section
    {
      name: 'filterActiveColorType',
      title: 'Active Button Color',
      type: 'string',
      group: 'filter',
      fieldset: 'filterFields',
      description: 'Background color for active filter button',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'filterActiveColorShade',
      title: 'Active Button Shade',
      type: 'number',
      group: 'filter',
      fieldset: 'filterFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.filterActiveColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'filterActiveCustomColor',
      title: 'Custom Active Button Color',
      type: 'simplerColor',
      group: 'filter',
      fieldset: 'filterFields',
      hidden: ({ parent }) => parent?.filterActiveColorType !== 'custom',
    },
    {
      name: 'filterActiveTextColor',
      title: 'Active Button Text',
      type: 'string',
      group: 'filter',
      fieldset: 'filterFields',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'filterInactiveColorType',
      title: 'Inactive Button Border Color',
      type: 'string',
      group: 'filter',
      fieldset: 'filterFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'secondary',
    },
    {
      name: 'filterInactiveColorShade',
      title: 'Inactive Button Border Shade',
      type: 'number',
      group: 'filter',
      fieldset: 'filterFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.filterInactiveColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'filterInactiveCustomColor',
      title: 'Custom Inactive Button Border',
      type: 'simplerColor',
      group: 'filter',
      fieldset: 'filterFields',
      hidden: ({ parent }) => parent?.filterInactiveColorType !== 'custom',
    },
    {
      name: 'filterInactiveTextColor',
      title: 'Inactive Button Text',
      type: 'string',
      group: 'filter',
      fieldset: 'filterFields',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'muted',
    },

    // Case Studies
    {
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      group: 'caseStudies',
      fieldset: 'caseStudiesFields',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      description:
        'Select and arrange the case studies to display on this page. Case studies are managed in the Case Studies collection.',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Case Studies Page',
      };
    },
  },
});
