import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fieldsets: [
    { name: 'heading', title: 'Main Heading' },
    {
      name: 'tagline',
      title: 'Tagline (optional)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'intro',
      title: 'Intro Paragraph (optional)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'cta',
      title: 'Call to Action Button (optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'backgroundSettings',
      title: 'Background',
      description:
        'If no background is configured, the frontend will default to your primary color from Site Settings.',
      type: 'object',
      fields: [
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
          initialValue: 'image',
        },
        // Image upload (collapsed: false to show directly)
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          description:
            'For best performance, use WebP format. Convert images at anywebp.com or squoosh.app',
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
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
        },
        // Color mode selection (flat, no nesting)
        {
          name: 'colorMode',
          title: 'Background Color Mode',
          type: 'string',
          hidden: ({ parent }) => parent?.backgroundType !== 'color',
          options: {
            list: [
              { title: 'Solid', value: 'solid' },
              { title: 'Gradient', value: 'gradient' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'solid',
        },
        // Solid color fields (flattened to avoid nested object collapsibles)
        {
          name: 'solidColorType',
          title: 'Color',
          type: 'string',
          hidden: ({ parent }) =>
            parent?.backgroundType !== 'color' || parent?.colorMode !== 'solid',
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
          name: 'solidColorShade',
          title: 'Shade',
          type: 'number',
          initialValue: 0,
          hidden: ({ parent }) =>
            parent?.backgroundType !== 'color' ||
            parent?.colorMode !== 'solid' ||
            parent?.solidColorType === 'custom',
          validation: (Rule) => Rule.min(0).max(100).integer(),
          components: {
            input: BackgroundShadeInput,
          },
        },
        {
          name: 'solidCustomColor',
          title: 'Custom Color',
          type: 'simplerColor',
          hidden: ({ parent }) =>
            parent?.backgroundType !== 'color' ||
            parent?.colorMode !== 'solid' ||
            parent?.solidColorType !== 'custom',
        },
        // Gradient fields
        {
          name: 'gradient',
          title: 'Gradient',
          type: 'object',
          hidden: ({ parent }) =>
            parent?.backgroundType !== 'color' ||
            parent?.colorMode !== 'gradient',
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
      ],
    },
    {
      name: 'heading',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [], // No heading styles - just plain text
          lists: [], // No lists
          marks: {
            decorators: [], // No bold/italic
            annotations: [], // No links
          },
        },
      ],
      description:
        'The primary headline for this page. Press Enter to create a line break.',
      fieldset: 'heading',
    },
    {
      name: 'headingColor',
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
      fieldset: 'heading',
    },
    {
      name: 'tagline',
      title: 'Text',
      type: 'string',
      description: 'Secondary headline below the main heading',
      fieldset: 'tagline',
    },
    {
      name: 'taglineColor',
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
      fieldset: 'tagline',
    },
    {
      name: 'subheading',
      title: 'Text',
      type: 'text',
      rows: 3,
      description: 'Supporting paragraph text below the subheading',
      fieldset: 'intro',
    },
    {
      name: 'subheadingColor',
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
      fieldset: 'intro',
    },
    {
      name: 'ctaButton',
      title: 'Button',
      type: 'link',
      description: 'Primary action button',
      fieldset: 'cta',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      tagline: 'tagline',
      media: 'backgroundSettings.image',
    },
    prepare({ heading, tagline, media }) {
      return {
        title: heading || 'Hero Section',
        subtitle: tagline || 'Hero section',
        media,
      };
    },
  },
});
