import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'approachPage',
  title: 'Our Approach Page',
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
    // Section dividers for "All Fields" view
    {
      name: 'heroFields',
      title: '🎯 Hero Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'coreValuesFields',
      title: '💡 Core Values Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'founderFields',
      title: '👤 Founder Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'highlightFields',
      title: '✨ Highlight Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'ctaFields',
      title: '📣 Call to Action Section',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'coreValues', title: 'Core Values' },
    { name: 'founder', title: 'Founder Section' },
    { name: 'highlight', title: 'Highlight Section' },
    { name: 'cta', title: 'Call to Action' },
  ],
  fields: [
    // SEO Fields
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used as the SEO title in search results.',
      initialValue: 'Our Approach',
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
      name: 'heroHeading',
      title: 'Heading',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 'Thoughtful partnership is the foundation of',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description:
        'This text appears in italic with a muted color at the end of the heading.',
      initialValue: 'lasting impact.',
    },
    {
      name: 'heroShowDivider',
      title: 'Show Divider',
      type: 'boolean',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: true,
      description: 'Toggle the horizontal line below the heading.',
    },
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
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'heroBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }) => parent?.heroBackgroundColorType !== 'custom',
    },

    // Core Values Section
    {
      name: 'coreValuesTitle',
      title: 'Section Title (optional)',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      description:
        'Hidden visually but available for SEO/accessibility. Leave empty to hide entirely.',
    },
    {
      name: 'coreValuesCards',
      title: 'Value Cards',
      type: 'array',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      of: [{ type: 'approachValueCard' }],
    },

    // Founder Section
    {
      name: 'founderTagline',
      title: 'Tagline',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      description: 'Small uppercase label above the title.',
      initialValue: "The Founder's Lens",
    },
    {
      name: 'founderTitle',
      title: 'Title',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      initialValue: 'A Personal Approach to Operational Strategy',
    },
    {
      name: 'founderContent',
      title: 'Content',
      type: 'portableText',
      group: 'founder',
      fieldset: 'founderFields',
      description: 'Main body text with rich text support.',
    },
    {
      name: 'founderQuote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      group: 'founder',
      fieldset: 'founderFields',
      description: 'Blockquote styled with left accent border.',
      initialValue:
        'That experience taught me how to build from ambiguity, to create systems, roles, and experiences where none existed, and to lead through creativity and innovation.',
    },
    {
      name: 'founderImage',
      title: 'Image',
      type: 'image',
      group: 'founder',
      fieldset: 'founderFields',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the image for screen readers and search engines.',
        },
        {
          name: 'seoFilename',
          title: 'SEO Filename (optional)',
          type: 'string',
          description:
            'Custom filename for SEO (e.g., "consultant-working" instead of "IMG_1234").',
        },
      ],
    },

    // Highlight Section
    {
      name: 'highlightTitle',
      title: 'Title',
      type: 'string',
      group: 'highlight',
      fieldset: 'highlightFields',
      initialValue: 'The Coaching Difference',
    },
    {
      name: 'highlightContent',
      title: 'Content',
      type: 'portableText',
      group: 'highlight',
      fieldset: 'highlightFields',
      description: 'Body paragraphs for the highlight section.',
    },
    {
      name: 'highlightBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'highlight',
      fieldset: 'highlightFields',
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
      name: 'highlightBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'highlight',
      fieldset: 'highlightFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.highlightBackgroundColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'highlightBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'highlight',
      fieldset: 'highlightFields',
      hidden: ({ parent }) => parent?.highlightBackgroundColorType !== 'custom',
    },

    // CTA Section
    {
      name: 'ctaTitle',
      title: 'Title',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaFields',
      initialValue: 'We Stay in the Work',
    },
    {
      name: 'ctaDescription',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'cta',
      fieldset: 'ctaFields',
      initialValue:
        'Unlike many consultants who give advice and move on, we partner with leaders and teams to implement change in real time.',
    },
    {
      name: 'ctaButton',
      title: 'Button',
      type: 'link',
      group: 'cta',
      fieldset: 'ctaFields',
    },
    {
      name: 'ctaBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'cta',
      fieldset: 'ctaFields',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'ctaBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'cta',
      fieldset: 'ctaFields',
      initialValue: 90,
      hidden: ({ parent }) =>
        parent?.ctaBackgroundColorType === 'custom' ||
        parent?.ctaBackgroundColorType === 'default',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'ctaBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'cta',
      fieldset: 'ctaFields',
      hidden: ({ parent }) => parent?.ctaBackgroundColorType !== 'custom',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Our Approach Page',
      };
    },
  },
});
