import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  fieldsets: [
    {
      name: 'hero',
      title: '🦸 Hero Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'intro',
      title: '📝 Intro Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'filter',
      title: '🔍 Filter Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'seo',
      title: '🔎 SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Hero Section
    {
      name: 'heroBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      fieldset: 'hero',
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
      fieldset: 'hero',
      initialValue: 90,
      hidden: ({ parent }) => parent?.heroBackgroundColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'heroBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      fieldset: 'hero',
      hidden: ({ parent }) => parent?.heroBackgroundColorType !== 'custom',
    },
    {
      name: 'heroHeading',
      title: 'Heading',
      type: 'string',
      fieldset: 'hero',
      description: 'Main heading text',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      fieldset: 'hero',
      description: 'Text within heading to italicize (optional)',
    },
    {
      name: 'heroHighlightColorType',
      title: 'Highlight Color',
      type: 'string',
      fieldset: 'hero',
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
      fieldset: 'hero',
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
      fieldset: 'hero',
      hidden: ({ parent }) =>
        !parent?.heroHeadingHighlight ||
        parent?.heroHighlightColorType !== 'custom',
    },
    {
      name: 'heroShowDivider',
      title: 'Show Divider',
      type: 'boolean',
      fieldset: 'hero',
      initialValue: true,
    },
    {
      name: 'heroDividerColorType',
      title: 'Divider Color',
      type: 'string',
      fieldset: 'hero',
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
      fieldset: 'hero',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.heroShowDivider || parent?.heroDividerColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'heroDividerCustomColor',
      title: 'Custom Divider Color',
      type: 'simplerColor',
      fieldset: 'hero',
      hidden: ({ parent }) =>
        !parent?.heroShowDivider || parent?.heroDividerColorType !== 'custom',
    },
    {
      name: 'heroTagline',
      title: 'Tagline',
      type: 'string',
      fieldset: 'hero',
      description: 'Subtitle text below heading',
    },
    {
      name: 'heroTaglineColor',
      title: 'Tagline Color',
      type: 'string',
      fieldset: 'hero',
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
      fieldset: 'intro',
      description: 'Section title (e.g., "Our Work")',
    },
    {
      name: 'introDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'intro',
      description: 'Description paragraph',
    },
    {
      name: 'introTitleColorType',
      title: 'Title Color',
      type: 'string',
      fieldset: 'intro',
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
      fieldset: 'intro',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.introTitle || parent?.introTitleColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'introTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      fieldset: 'intro',
      hidden: ({ parent }) =>
        !parent?.introTitle || parent?.introTitleColorType !== 'custom',
    },
    {
      name: 'introDescriptionColor',
      title: 'Description Color',
      type: 'string',
      fieldset: 'intro',
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
      fieldset: 'intro',
      description: 'Italic footer text below description',
    },
    {
      name: 'introFooterColorType',
      title: 'Footer Color',
      type: 'string',
      fieldset: 'intro',
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
      fieldset: 'intro',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.introFooter || parent?.introFooterColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'introFooterCustomColor',
      title: 'Custom Footer Color',
      type: 'simplerColor',
      fieldset: 'intro',
      hidden: ({ parent }) =>
        !parent?.introFooter || parent?.introFooterColorType !== 'custom',
    },

    // Filter Section
    {
      name: 'filterActiveColorType',
      title: 'Active Button Color',
      type: 'string',
      fieldset: 'filter',
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
      fieldset: 'filter',
      initialValue: 0,
      hidden: ({ parent }) => parent?.filterActiveColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'filterActiveCustomColor',
      title: 'Custom Active Button Color',
      type: 'simplerColor',
      fieldset: 'filter',
      hidden: ({ parent }) => parent?.filterActiveColorType !== 'custom',
    },
    {
      name: 'filterActiveTextColor',
      title: 'Active Button Text',
      type: 'string',
      fieldset: 'filter',
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
      fieldset: 'filter',
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
      fieldset: 'filter',
      initialValue: 0,
      hidden: ({ parent }) => parent?.filterInactiveColorType === 'custom',
      components: { input: BackgroundShadeInput },
    },
    {
      name: 'filterInactiveCustomColor',
      title: 'Custom Inactive Button Border',
      type: 'simplerColor',
      fieldset: 'filter',
      hidden: ({ parent }) => parent?.filterInactiveColorType !== 'custom',
    },
    {
      name: 'filterInactiveTextColor',
      title: 'Inactive Button Text',
      type: 'string',
      fieldset: 'filter',
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

    // SEO
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      fieldset: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Case Studies Page',
        subtitle: 'Page configuration',
      };
    },
  },
});
