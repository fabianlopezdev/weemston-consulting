import { defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'The primary headline for this page',
    },
    {
      name: 'headingColor',
      title: 'Heading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'tagline',
      title: 'Tagline (optional)',
      type: 'string',
      description: 'Secondary headline below the main heading',
    },
    {
      name: 'taglineColor',
      title: 'Tagline Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'subheading',
      title: 'Intro Paragraph (optional)',
      type: 'text',
      rows: 3,
      description: 'Supporting paragraph text below the subheading',
    },
    {
      name: 'subheadingColor',
      title: 'Intro Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button (optional)',
      type: 'link',
      description: 'Primary action button',
    },
    {
      name: 'backgroundSettings',
      title: 'Background',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
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
          type: 'image',
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
          options: {
            hotspot: true,
            collapsed: false,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Required for accessibility',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        // Color mode selection (flat, no nesting)
        {
          name: 'colorMode',
          title: 'Color Mode',
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
        // Solid color fields
        {
          name: 'solidColor',
          title: 'Solid Color',
          type: 'object',
          hidden: ({ parent }) =>
            parent?.backgroundType !== 'color' || parent?.colorMode !== 'solid',
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
              description: '0 = base color, 100 = lightest',
            },
            {
              name: 'customColor',
              title: 'Custom Color',
              type: 'simplerColor',
              hidden: ({ parent }) => parent?.colorType !== 'custom',
            },
          ],
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
                },
                {
                  name: 'customColor',
                  title: 'Custom Color',
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
                },
                {
                  name: 'customColor',
                  title: 'Custom Color',
                  type: 'simplerColor',
                  hidden: ({ parent }) => parent?.colorType !== 'custom',
                },
              ],
            },
          ],
        },
      ],
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
