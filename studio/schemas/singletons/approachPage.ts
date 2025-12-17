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
      name: 'collageFields',
      title: '🖼️ Collage Section',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'coreValues', title: 'Core Values' },
    { name: 'founder', title: 'Founder Section' },
    { name: 'highlight', title: 'Highlight Section' },
    { name: 'collage', title: 'Collage Section' },
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
      name: 'heroBackgroundColorMode',
      title: 'Background Mode',
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
      initialValue:
        'Thoughtful partnership is the foundation of lasting impact.',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      group: 'hero',
      fieldset: 'heroFields',
      description:
        'Enter the exact text from the heading that should be highlighted (italic). Must match exactly.',
      initialValue: 'lasting impact.',
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

    // Core Values Section
    {
      name: 'coreValuesBackgroundColorType',
      title: 'Section Background Color',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
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
    },
    {
      name: 'coreValuesBackgroundColorMode',
      title: 'Background Mode',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Gradient', value: 'gradient' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'solid',
      hidden: ({ parent }) =>
        parent?.coreValuesBackgroundColorType === 'default' ||
        !parent?.coreValuesBackgroundColorType,
    },
    {
      name: 'coreValuesBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      initialValue: 90,
      hidden: ({ parent }) =>
        parent?.coreValuesBackgroundColorType === 'custom' ||
        parent?.coreValuesBackgroundColorType === 'default' ||
        parent?.coreValuesBackgroundColorMode === 'gradient' ||
        !parent?.coreValuesBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'coreValuesBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      hidden: ({ parent }) =>
        parent?.coreValuesBackgroundColorType !== 'custom' ||
        parent?.coreValuesBackgroundColorMode === 'gradient',
    },
    {
      name: 'coreValuesBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      hidden: ({ parent }) =>
        parent?.coreValuesBackgroundColorType === 'default' ||
        !parent?.coreValuesBackgroundColorType ||
        parent?.coreValuesBackgroundColorMode !== 'gradient',
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
      name: 'coreValuesTitle',
      title: 'Section Title',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
    },
    {
      name: 'coreValuesShowTitle',
      title: 'Show Title',
      type: 'boolean',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      initialValue: true,
      description:
        'When disabled, the title remains in the HTML for SEO and screen readers but is hidden visually.',
    },
    {
      name: 'coreValuesTitleColorType',
      title: 'Title Color',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.coreValuesShowTitle,
    },
    {
      name: 'coreValuesTitleColorShade',
      title: 'Title Shade',
      type: 'number',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.coreValuesShowTitle ||
        parent?.coreValuesTitleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'coreValuesTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      hidden: ({ parent }) =>
        !parent?.coreValuesShowTitle ||
        parent?.coreValuesTitleColorType !== 'custom',
    },
    {
      name: 'coreValuesCardBackgroundColorType',
      title: 'Card Background Color',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
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
    },
    {
      name: 'coreValuesCardBackgroundColorShade',
      title: 'Card Background Shade',
      type: 'number',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      initialValue: 90,
      hidden: ({ parent }) =>
        parent?.coreValuesCardBackgroundColorType === 'custom' ||
        parent?.coreValuesCardBackgroundColorType === 'default',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'coreValuesCardBackgroundCustomColor',
      title: 'Custom Card Background Color',
      type: 'simplerColor',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      hidden: ({ parent }) =>
        parent?.coreValuesCardBackgroundColorType !== 'custom',
    },
    {
      name: 'coreValuesCardTitleColorType',
      title: 'Card Title Color',
      type: 'string',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
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
      name: 'coreValuesCardTitleColorShade',
      title: 'Card Title Shade',
      type: 'number',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.coreValuesCardTitleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'coreValuesCardTitleCustomColor',
      title: 'Custom Card Title Color',
      type: 'simplerColor',
      group: 'coreValues',
      fieldset: 'coreValuesFields',
      hidden: ({ parent }) => parent?.coreValuesCardTitleColorType !== 'custom',
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
      name: 'founderBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
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
    },
    {
      name: 'founderBackgroundColorMode',
      title: 'Background Mode',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Gradient', value: 'gradient' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'solid',
      hidden: ({ parent }) =>
        parent?.founderBackgroundColorType === 'default' ||
        !parent?.founderBackgroundColorType,
    },
    {
      name: 'founderBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'founder',
      fieldset: 'founderFields',
      initialValue: 90,
      hidden: ({ parent }) =>
        parent?.founderBackgroundColorType === 'custom' ||
        parent?.founderBackgroundColorType === 'default' ||
        parent?.founderBackgroundColorMode === 'gradient' ||
        !parent?.founderBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'founderBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'founder',
      fieldset: 'founderFields',
      hidden: ({ parent }) =>
        parent?.founderBackgroundColorType !== 'custom' ||
        parent?.founderBackgroundColorMode === 'gradient',
    },
    {
      name: 'founderBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'founder',
      fieldset: 'founderFields',
      hidden: ({ parent }) =>
        parent?.founderBackgroundColorType === 'default' ||
        !parent?.founderBackgroundColorType ||
        parent?.founderBackgroundColorMode !== 'gradient',
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
      name: 'founderTagline',
      title: 'Tagline',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      description: 'Small uppercase label above the title.',
      initialValue: "The Founder's Lens",
    },
    {
      name: 'founderTaglineColorType',
      title: 'Tagline Color',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.founderTagline,
    },
    {
      name: 'founderTaglineColorShade',
      title: 'Tagline Shade',
      type: 'number',
      group: 'founder',
      fieldset: 'founderFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.founderTagline || parent?.founderTaglineColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'founderTaglineCustomColor',
      title: 'Custom Tagline Color',
      type: 'simplerColor',
      group: 'founder',
      fieldset: 'founderFields',
      hidden: ({ parent }) =>
        !parent?.founderTagline || parent?.founderTaglineColorType !== 'custom',
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
      name: 'founderTitleColorType',
      title: 'Title Color',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
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
      name: 'founderTitleColorShade',
      title: 'Title Shade',
      type: 'number',
      group: 'founder',
      fieldset: 'founderFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.founderTitleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'founderTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'founder',
      fieldset: 'founderFields',
      hidden: ({ parent }) => parent?.founderTitleColorType !== 'custom',
    },
    {
      name: 'founderContent',
      title: 'Content',
      type: 'text',
      rows: 10,
      group: 'founder',
      fieldset: 'founderFields',
      description:
        'Full text content including the quote. Use blank lines to separate paragraphs.',
    },
    {
      name: 'founderTextColor',
      title: 'Content Text Color',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
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
    {
      name: 'founderQuote',
      title: 'Quote Highlight',
      type: 'text',
      rows: 3,
      group: 'founder',
      fieldset: 'founderFields',
      description:
        'Enter the exact text from Content that should be styled as a blockquote. Must match exactly.',
    },
    {
      name: 'founderQuoteColorType',
      title: 'Quote Color',
      type: 'string',
      group: 'founder',
      fieldset: 'founderFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.founderQuote,
    },
    {
      name: 'founderQuoteColorShade',
      title: 'Quote Shade',
      type: 'number',
      group: 'founder',
      fieldset: 'founderFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.founderQuote || parent?.founderQuoteColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'founderQuoteCustomColor',
      title: 'Custom Quote Color',
      type: 'simplerColor',
      group: 'founder',
      fieldset: 'founderFields',
      hidden: ({ parent }) =>
        !parent?.founderQuote || parent?.founderQuoteColorType !== 'custom',
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
          description:
            'Describes the image for screen readers and search engines.',
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
      name: 'highlightBackgroundColorMode',
      title: 'Background Mode',
      type: 'string',
      group: 'highlight',
      fieldset: 'highlightFields',
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
      name: 'highlightBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'highlight',
      fieldset: 'highlightFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.highlightBackgroundColorType === 'custom' ||
        parent?.highlightBackgroundColorMode === 'gradient',
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
      hidden: ({ parent }) =>
        parent?.highlightBackgroundColorType !== 'custom' ||
        parent?.highlightBackgroundColorMode === 'gradient',
    },
    {
      name: 'highlightBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'highlight',
      fieldset: 'highlightFields',
      hidden: ({ parent }) =>
        parent?.highlightBackgroundColorMode !== 'gradient',
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
      name: 'highlightTitle',
      title: 'Title',
      type: 'string',
      group: 'highlight',
      fieldset: 'highlightFields',
      initialValue: 'The Coaching Difference',
    },
    {
      name: 'highlightTitleColorType',
      title: 'Title Color',
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
      name: 'highlightTitleColorShade',
      title: 'Title Shade',
      type: 'number',
      group: 'highlight',
      fieldset: 'highlightFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.highlightTitleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'highlightTitleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'highlight',
      fieldset: 'highlightFields',
      hidden: ({ parent }) => parent?.highlightTitleColorType !== 'custom',
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
      name: 'highlightTextColor',
      title: 'Content Text Color',
      type: 'string',
      group: 'highlight',
      fieldset: 'highlightFields',
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
    },

    // Collage Section Fields
    {
      name: 'collageEnabled',
      title: 'Enable Collage Section',
      type: 'boolean',
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Show a collage section at the end of the page',
      initialValue: false,
    },
    {
      name: 'collageTagline',
      title: 'Tagline',
      type: 'string',
      group: 'collage',
      fieldset: 'collageFields',
      description:
        'The statement that will appear overlaid on the image collage',
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageTaglineSize',
      title: 'Tagline Size',
      type: 'string',
      group: 'collage',
      fieldset: 'collageFields',
      options: {
        list: [
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'xlarge' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageUseAsSectionTitle',
      title: 'Use as Section Title',
      type: 'boolean',
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Use this when the text serves as a title for the section',
      initialValue: false,
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageImages',
      title: 'Images',
      type: 'array',
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Add 3-8 images for the collage strip (16:9 aspect ratio)',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describes the image for screen readers and SEO',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { collageEnabled?: boolean };
          if (parent?.collageEnabled) {
            if (!value || (value as unknown[]).length < 3) {
              return 'At least 3 images are required when section is enabled';
            }
            if ((value as unknown[]).length > 8) {
              return 'Maximum 8 images allowed';
            }
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageShowDescription',
      title: 'Show Description',
      type: 'boolean',
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Add a description below the tagline',
      initialValue: false,
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Supporting text that appears below the tagline',
      hidden: ({ parent }) =>
        !parent?.collageEnabled || !parent?.collageShowDescription,
    },
    {
      name: 'collageShowCta',
      title: 'Show Call to Action',
      type: 'boolean',
      group: 'collage',
      fieldset: 'collageFields',
      description: 'Add a CTA button below the content',
      initialValue: false,
      hidden: ({ parent }) => !parent?.collageEnabled,
    },
    {
      name: 'collageCtaButton',
      title: 'CTA Button',
      type: 'link',
      group: 'collage',
      fieldset: 'collageFields',
      hidden: ({ parent }) =>
        !parent?.collageEnabled || !parent?.collageShowCta,
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
