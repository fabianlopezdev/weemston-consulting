import { defineType } from 'sanity';
import { AboutSizeInput } from '../../../components/AboutSizeInput';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fieldsets: [
    {
      name: 'background',
      title: 'Background',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'taglineSettings',
      title: 'Tagline Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'textSettings',
      title: 'Text Color',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this section on the homepage',
    },
    // Background Type Selection
    {
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Color', value: 'color' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'color',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'background',
    },
    // Background Image
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description:
        'For best performance, use WebP format. Convert images at anywebp.com or squoosh.app',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundType !== 'image',
      options: {
        hotspot: true,
        collapsed: false,
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
            'Describes the image for screen readers and search engines. Be specific (e.g., "Business consultant presenting strategy" not just "meeting"). Include relevant keywords naturally.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'Custom Filename',
          type: 'string',
          description:
            'Improves image SEO by giving Google a descriptive filename (e.g., "business-consulting-hero" instead of "IMG_1234"). Use lowercase with hyphens, no spaces or special characters.',
          fieldset: 'seoFilename',
        },
      ],
      fieldset: 'background',
    },
    // Color Mode Selection
    {
      name: 'colorMode',
      title: 'Color Mode',
      type: 'string',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundType !== 'color',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Gradient', value: 'gradient' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'solid',
      fieldset: 'background',
    },
    // Solid Color Settings
    {
      name: 'backgroundColorType',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.backgroundType === 'image' ||
        parent?.colorMode !== 'solid',
      fieldset: 'background',
    },
    {
      name: 'backgroundColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.backgroundType === 'image' ||
        parent?.colorMode !== 'solid' ||
        parent?.backgroundColorType === 'custom' ||
        parent?.backgroundColorType === 'default' ||
        !parent?.backgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'background',
    },
    {
      name: 'backgroundCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.backgroundType === 'image' ||
        parent?.colorMode !== 'solid' ||
        parent?.backgroundColorType !== 'custom',
      fieldset: 'background',
    },
    // Gradient Settings
    {
      name: 'gradient',
      title: 'Gradient',
      type: 'object',
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.backgroundType === 'image' ||
        parent?.colorMode !== 'gradient',
      fieldset: 'background',
      fields: [
        {
          name: 'direction',
          title: 'Direction',
          type: 'string',
          options: {
            list: [
              { title: 'Top to Bottom', value: 'to bottom' },
              { title: 'Bottom to Top', value: 'to top' },
              { title: 'Left to Right', value: 'to right' },
              { title: 'Right to Left', value: 'to left' },
              { title: 'Diagonal ↘', value: '135deg' },
              { title: 'Diagonal ↗', value: '45deg' },
            ],
          },
          initialValue: '135deg',
        },
        {
          name: 'startColor',
          title: 'Start Color',
          type: 'object',
          fields: [
            {
              name: 'colorType',
              title: 'Color',
              type: 'string',
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
              name: 'shade',
              title: 'Shade',
              type: 'number',
              initialValue: 0,
              hidden: ({ parent }) => parent?.colorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: {
                input: BackgroundShadeInput,
              },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }) => parent?.colorType !== 'custom',
            },
          ],
        },
        {
          name: 'endColor',
          title: 'End Color',
          type: 'object',
          fields: [
            {
              name: 'colorType',
              title: 'Color',
              type: 'string',
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
              name: 'shade',
              title: 'Shade',
              type: 'number',
              initialValue: 0,
              hidden: ({ parent }) => parent?.colorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: {
                input: BackgroundShadeInput,
              },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }) => parent?.colorType !== 'custom',
            },
          ],
        },
      ],
    },
    // Text Color Settings
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'textSettings',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Us',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'showTitle',
      title: 'Show Title',
      type: 'boolean',
      initialValue: true,
      description:
        'When disabled, the title remains in the HTML for SEO and screen readers but is hidden visually',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'portableText',
      description:
        'Large opening statement in Lora serif font. Use bold for accent highlights.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Tagline is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    // Tagline Color Settings
    {
      name: 'taglineColorType',
      title: 'Tagline Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'taglineSettings',
    },
    {
      name: 'taglineColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.taglineColorType === 'custom' ||
        parent?.taglineColorType === 'default' ||
        !parent?.taglineColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'taglineSettings',
    },
    {
      name: 'taglineCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.taglineColorType !== 'custom',
      fieldset: 'taglineSettings',
    },
    {
      name: 'fontSize',
      title: 'Tagline Size',
      type: 'number',
      initialValue: 2,
      description: 'Tagline font size in rem units (1.5-4rem)',
      components: {
        input: AboutSizeInput,
      },
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'portableText',
      description:
        'Descriptive text below tagline in Now sans-serif font. Use bold for accent highlights.',
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      media: 'backgroundImage',
    },
    prepare({ title, enabled, media }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'About';
      const subtitle = enabled ? 'Visible on site' : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
        media,
      };
    },
  },
});
