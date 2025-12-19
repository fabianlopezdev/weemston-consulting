import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'bioFields',
      title: '👤 Bio Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'infoGridFields',
      title: '📋 Info Grid Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'trustedByFields',
      title: '🤝 Trusted By Section',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'bio', title: 'Bio Section' },
    { name: 'infoGrid', title: 'Info Grid' },
    { name: 'trustedBy', title: 'Trusted By' },
  ],
  fields: [
    // SEO Fields
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used as the SEO title in search results.',
      initialValue: 'About',
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

    // ==========================================
    // HERO SECTION
    // ==========================================
    {
      name: 'heroBackgroundColorMode',
      title: 'Background Color Mode',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
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
      hidden: ({ parent }) => parent?.heroBackgroundColorMode === 'gradient',
    },
    {
      name: 'heroBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 90,
      hidden: ({ parent }) =>
        parent?.heroBackgroundColorType === 'custom' ||
        parent?.heroBackgroundColorMode === 'gradient',
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
      hidden: ({ parent }) =>
        parent?.heroBackgroundColorType !== 'custom' ||
        parent?.heroBackgroundColorMode === 'gradient',
    },
    {
      name: 'heroBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }) => parent?.heroBackgroundColorMode !== 'gradient',
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
              components: { input: BackgroundShadeInput },
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
              components: { input: BackgroundShadeInput },
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
    {
      name: 'heroHeading',
      title: 'Heading',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 'About',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description:
        'Enter the exact text from the heading that should be highlighted (italic). Must match exactly.',
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
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
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
      description: 'Toggle the horizontal line below the heading.',
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
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
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
      type: 'text',
      rows: 3,
      group: 'hero',
      fieldset: 'heroFields',
      description: 'Supporting text that appears below the divider line.',
    },
    {
      name: 'heroTaglineColor',
      title: 'Tagline Text Color',
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

    // ==========================================
    // BIO SECTION
    // ==========================================
    {
      name: 'bioBackgroundColorMode',
      title: 'Background Color Mode',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
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
    {
      name: 'bioBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.bioBackgroundColorMode === 'gradient',
    },
    {
      name: 'bioBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'bio',
      fieldset: 'bioFields',
      initialValue: 95,
      hidden: ({ parent }) =>
        parent?.bioBackgroundColorType === 'custom' ||
        parent?.bioBackgroundColorType === 'default' ||
        parent?.bioBackgroundColorMode === 'gradient',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'bioBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'bio',
      fieldset: 'bioFields',
      hidden: ({ parent }) =>
        parent?.bioBackgroundColorType !== 'custom' ||
        parent?.bioBackgroundColorMode === 'gradient',
    },
    {
      name: 'bioBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'bio',
      fieldset: 'bioFields',
      hidden: ({ parent }) => parent?.bioBackgroundColorMode !== 'gradient',
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
              components: { input: BackgroundShadeInput },
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
              components: { input: BackgroundShadeInput },
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
    {
      name: 'bioImage',
      title: 'Photo',
      type: 'image',
      group: 'bio',
      fieldset: 'bioFields',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the image for screen readers',
        },
      ],
    },
    {
      name: 'bioLabel',
      title: 'Label',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
      description: 'E.g., "Founder & Lead Consultant"',
      initialValue: 'Founder & Lead Consultant',
    },
    {
      name: 'bioLabelColorType',
      title: 'Label Color',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.bioLabel,
    },
    {
      name: 'bioLabelColorShade',
      title: 'Label Shade',
      type: 'number',
      group: 'bio',
      fieldset: 'bioFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.bioLabel || parent?.bioLabelColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'bioLabelCustomColor',
      title: 'Custom Label Color',
      type: 'simplerColor',
      group: 'bio',
      fieldset: 'bioFields',
      hidden: ({ parent }) =>
        !parent?.bioLabel || parent?.bioLabelColorType !== 'custom',
    },
    {
      name: 'bioName',
      title: 'Name',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
      description: 'The main heading name',
      initialValue: 'Jessica Weeman',
    },
    {
      name: 'bioNameColorType',
      title: 'Name Color',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.bioName,
    },
    {
      name: 'bioNameColorShade',
      title: 'Name Shade',
      type: 'number',
      group: 'bio',
      fieldset: 'bioFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.bioName || parent?.bioNameColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'bioNameCustomColor',
      title: 'Custom Name Color',
      type: 'simplerColor',
      group: 'bio',
      fieldset: 'bioFields',
      hidden: ({ parent }) =>
        !parent?.bioName || parent?.bioNameColorType !== 'custom',
    },
    {
      name: 'bioDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'bio',
      fieldset: 'bioFields',
      description: 'The paragraph describing the person',
    },
    {
      name: 'bioDescriptionColor',
      title: 'Description Color',
      type: 'string',
      group: 'bio',
      fieldset: 'bioFields',
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
      hidden: ({ parent }) => !parent?.bioDescription,
    },

    // ==========================================
    // INFO GRID SECTION
    // ==========================================
    {
      name: 'infoGridBackgroundColorMode',
      title: 'Background Color Mode',
      type: 'string',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
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
    {
      name: 'infoGridBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) =>
        parent?.infoGridBackgroundColorMode === 'gradient',
    },
    {
      name: 'infoGridBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
      initialValue: 95,
      hidden: ({ parent }) =>
        parent?.infoGridBackgroundColorType === 'custom' ||
        parent?.infoGridBackgroundColorType === 'default' ||
        parent?.infoGridBackgroundColorMode === 'gradient',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'infoGridBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
      hidden: ({ parent }) =>
        parent?.infoGridBackgroundColorType !== 'custom' ||
        parent?.infoGridBackgroundColorMode === 'gradient',
    },
    {
      name: 'infoGridBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
      hidden: ({ parent }) =>
        parent?.infoGridBackgroundColorMode !== 'gradient',
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
              components: { input: BackgroundShadeInput },
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
              components: { input: BackgroundShadeInput },
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
    {
      name: 'infoCards',
      title: 'Info Cards',
      type: 'array',
      group: 'infoGrid',
      fieldset: 'infoGridFields',
      of: [{ type: 'aboutInfoCard' }],
      description: 'Add cards with icons, titles, and content paragraphs',
    },

    // ==========================================
    // TRUSTED BY SECTION
    // ==========================================
    {
      name: 'trustedByBackgroundColorMode',
      title: 'Background Color Mode',
      type: 'string',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
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
    {
      name: 'trustedByBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) =>
        parent?.trustedByBackgroundColorMode === 'gradient',
    },
    {
      name: 'trustedByBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      initialValue: 95,
      hidden: ({ parent }) =>
        parent?.trustedByBackgroundColorType === 'custom' ||
        parent?.trustedByBackgroundColorType === 'default' ||
        parent?.trustedByBackgroundColorMode === 'gradient',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'trustedByBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      hidden: ({ parent }) =>
        parent?.trustedByBackgroundColorType !== 'custom' ||
        parent?.trustedByBackgroundColorMode === 'gradient',
    },
    {
      name: 'trustedByBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      hidden: ({ parent }) =>
        parent?.trustedByBackgroundColorMode !== 'gradient',
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
              components: { input: BackgroundShadeInput },
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
              components: { input: BackgroundShadeInput },
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
    {
      name: 'trustedByTitle',
      title: 'Title',
      type: 'string',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      initialValue: 'Trusted By Teams At',
    },
    {
      name: 'trustedByShowTitle',
      title: 'Show Title',
      type: 'boolean',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      initialValue: true,
    },
    {
      name: 'trustedByTitleColorType',
      title: 'Title Color',
      type: 'string',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) =>
        !parent?.trustedByTitle || !parent?.trustedByShowTitle,
    },
    {
      name: 'trustedByTitleColorShade',
      title: 'Title Shade',
      type: 'number',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      initialValue: 50,
      hidden: ({ parent }) =>
        !parent?.trustedByTitle ||
        !parent?.trustedByShowTitle ||
        parent?.trustedByTitleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'trustedByTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      hidden: ({ parent }) =>
        !parent?.trustedByTitle ||
        !parent?.trustedByShowTitle ||
        parent?.trustedByTitleColorType !== 'custom',
    },
    {
      name: 'trustedByCaseStudies',
      title: 'Featured Clients',
      type: 'array',
      group: 'trustedBy',
      fieldset: 'trustedByFields',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      description:
        'Select case studies to display their client logos. Only case studies with logos will be shown.',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'About Page',
      };
    },
  },
});
