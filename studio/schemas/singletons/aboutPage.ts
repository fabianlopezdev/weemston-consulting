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
      name: 'aboutFields',
      title: '📖 About Sections',
      description: 'Add sections with title, description, and photo collages',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'trustedByFields',
      title: '👥 Clients Section',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Sections' },
    { name: 'trustedBy', title: 'Clients' },
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
    // ABOUT SECTIONS
    // ==========================================
    {
      name: 'aboutSections',
      title: 'About Sections',
      type: 'array',
      group: 'about',
      fieldset: 'aboutFields',
      of: [
        {
          type: 'object',
          name: 'aboutSection',
          title: 'About Section',
          fieldsets: [
            {
              name: 'content',
              title: '📝 Content',
              options: { collapsible: true, collapsed: false },
            },
            {
              name: 'colors',
              title: '🎨 Colors',
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            // Content fields
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              fieldset: 'content',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'portableText',
              fieldset: 'content',
            },
            {
              name: 'images',
              title: 'Photos',
              type: 'array',
              fieldset: 'content',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Describe the image for accessibility',
                    },
                    {
                      name: 'positionHorizontal',
                      title: 'Horizontal Position',
                      type: 'string',
                      description: 'Where to focus horizontally when cropping',
                      options: {
                        list: [
                          { title: 'Left', value: 'left' },
                          { title: 'Center', value: 'center' },
                          { title: 'Right', value: 'right' },
                        ],
                        layout: 'radio',
                        direction: 'horizontal',
                      },
                      initialValue: 'center',
                    },
                    {
                      name: 'positionVertical',
                      title: 'Vertical Position',
                      type: 'string',
                      description: 'Where to focus vertically when cropping',
                      options: {
                        list: [
                          { title: 'Top', value: 'top' },
                          { title: 'Center', value: 'center' },
                          { title: 'Bottom', value: 'bottom' },
                        ],
                        layout: 'radio',
                        direction: 'horizontal',
                      },
                      initialValue: 'center',
                    },
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.max(3).warning('Maximum 3 images per section'),
              description:
                'Add 1-3 photos. They will display as a collage alongside the content.',
            },
            // Background color fields
            {
              name: 'backgroundColorMode',
              title: 'Background Mode',
              type: 'string',
              fieldset: 'colors',
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
              name: 'backgroundColorType',
              title: 'Background Color',
              type: 'string',
              fieldset: 'colors',
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
                parent?.backgroundColorMode === 'gradient',
            },
            {
              name: 'backgroundColorShade',
              title: 'Background Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 95,
              hidden: ({ parent }) =>
                parent?.backgroundColorType === 'custom' ||
                parent?.backgroundColorType === 'default' ||
                parent?.backgroundColorMode === 'gradient',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: {
                input: BackgroundShadeInput,
              },
            },
            {
              name: 'backgroundCustomColor',
              title: 'Custom Background Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }) =>
                parent?.backgroundColorType !== 'custom' ||
                parent?.backgroundColorMode === 'gradient',
            },
            {
              name: 'backgroundGradient',
              title: 'Gradient',
              type: 'object',
              fieldset: 'colors',
              hidden: ({ parent }) =>
                parent?.backgroundColorMode !== 'gradient',
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
            // Title color fields
            {
              name: 'titleColorType',
              title: 'Title Color',
              type: 'string',
              fieldset: 'colors',
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
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }) => parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: {
                input: BackgroundShadeInput,
              },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }) => parent?.titleColorType !== 'custom',
            },
            // Description text color
            {
              name: 'descriptionTextColor',
              title: 'Description Text Color',
              type: 'string',
              fieldset: 'colors',
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
          ],
          preview: {
            select: {
              title: 'title',
              media: 'images.0',
            },
            prepare({ title, media }) {
              return {
                title: title || 'About Section',
                media,
              };
            },
          },
        },
      ],
      description:
        'Add sections with titles, descriptions, and photo collages. Images alternate sides automatically.',
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
