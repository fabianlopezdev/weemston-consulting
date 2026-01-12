import { defineType, defineArrayMember, type Rule } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

// Reusable background color fields for sections
const backgroundColorFields = [
  {
    name: 'backgroundColorMode',
    title: 'Background Mode',
    type: 'string',
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
    hidden: ({ parent }: { parent: { backgroundColorMode?: string } }) =>
      parent?.backgroundColorMode === 'gradient',
  },
  {
    name: 'backgroundColorShade',
    title: 'Background Shade',
    type: 'number',
    initialValue: 95,
    hidden: ({
      parent,
    }: {
      parent: {
        backgroundColorType?: string;
        backgroundColorMode?: string;
      };
    }) =>
      parent?.backgroundColorType === 'custom' ||
      parent?.backgroundColorType === 'default' ||
      parent?.backgroundColorMode === 'gradient',
    validation: (rule: Rule) => rule.min(0).max(100).integer(),
    components: {
      input: BackgroundShadeInput,
    },
  },
  {
    name: 'backgroundCustomColor',
    title: 'Custom Background Color',
    type: 'simplerColor',
    hidden: ({
      parent,
    }: {
      parent: {
        backgroundColorType?: string;
        backgroundColorMode?: string;
      };
    }) =>
      parent?.backgroundColorType !== 'custom' ||
      parent?.backgroundColorMode === 'gradient',
  },
  {
    name: 'backgroundGradient',
    title: 'Gradient',
    type: 'object',
    hidden: ({ parent }: { parent: { backgroundColorMode?: string } }) =>
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
            hidden: ({ parent }: { parent: { colorType?: string } }) =>
              parent?.colorType === 'custom',
            components: { input: BackgroundShadeInput },
          },
          {
            name: 'customColor',
            title: ' ',
            type: 'simplerColor',
            hidden: ({ parent }: { parent: { colorType?: string } }) =>
              parent?.colorType !== 'custom',
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
            hidden: ({ parent }: { parent: { colorType?: string } }) =>
              parent?.colorType === 'custom',
            components: { input: BackgroundShadeInput },
          },
          {
            name: 'customColor',
            title: ' ',
            type: 'simplerColor',
            hidden: ({ parent }: { parent: { colorType?: string } }) =>
              parent?.colorType !== 'custom',
          },
        ],
      },
    ],
  },
];

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
        'Also called OG Image. The image shown when this page is shared on social media.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'heroFields',
      title: '🎯 Hero Section',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'sections', title: 'Page Sections' },
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
      hidden: ({ parent }: { parent: { heroBackgroundColorMode?: string } }) =>
        parent?.heroBackgroundColorMode === 'gradient',
    },
    {
      name: 'heroBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 90,
      hidden: ({
        parent,
      }: {
        parent: {
          heroBackgroundColorType?: string;
          heroBackgroundColorMode?: string;
        };
      }) =>
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
      hidden: ({
        parent,
      }: {
        parent: {
          heroBackgroundColorType?: string;
          heroBackgroundColorMode?: string;
        };
      }) =>
        parent?.heroBackgroundColorType !== 'custom' ||
        parent?.heroBackgroundColorMode === 'gradient',
    },
    {
      name: 'heroBackgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'hero',
      fieldset: 'heroFields',
      hidden: ({ parent }: { parent: { heroBackgroundColorMode?: string } }) =>
        parent?.heroBackgroundColorMode !== 'gradient',
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
              hidden: ({ parent }: { parent: { colorType?: string } }) =>
                parent?.colorType === 'custom',
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }: { parent: { colorType?: string } }) =>
                parent?.colorType !== 'custom',
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
              hidden: ({ parent }: { parent: { colorType?: string } }) =>
                parent?.colorType === 'custom',
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }: { parent: { colorType?: string } }) =>
                parent?.colorType !== 'custom',
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
      hidden: ({ parent }: { parent: { heroHeadingHighlight?: string } }) =>
        !parent?.heroHeadingHighlight,
    },
    {
      name: 'heroHighlightColorShade',
      title: 'Highlight Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 0,
      hidden: ({
        parent,
      }: {
        parent: {
          heroHeadingHighlight?: string;
          heroHighlightColorType?: string;
        };
      }) =>
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
      hidden: ({
        parent,
      }: {
        parent: {
          heroHeadingHighlight?: string;
          heroHighlightColorType?: string;
        };
      }) =>
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
      hidden: ({ parent }: { parent: { heroShowDivider?: boolean } }) =>
        !parent?.heroShowDivider,
    },
    {
      name: 'heroDividerColorShade',
      title: 'Divider Shade',
      type: 'number',
      group: 'hero',
      fieldset: 'heroFields',
      initialValue: 0,
      hidden: ({
        parent,
      }: {
        parent: { heroShowDivider?: boolean; heroDividerColorType?: string };
      }) =>
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
      hidden: ({
        parent,
      }: {
        parent: { heroShowDivider?: boolean; heroDividerColorType?: string };
      }) =>
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
      hidden: ({ parent }: { parent: { heroTagline?: string } }) =>
        !parent?.heroTagline,
    },

    // ==========================================
    // SECTIONS ARRAY
    // ==========================================
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'sections',
      description:
        'Build your About page by adding and reordering sections. Each section type has its own layout and styling options.',
      of: [
        // ==========================================
        // SECTION TITLE
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'sectionTitle',
          title: 'Section Title',
          icon: () => '🏷️',
          fieldsets: [
            {
              name: 'content',
              title: '📝 Title',
              options: { collapsible: true, collapsed: false },
            },
            {
              name: 'background',
              title: '🎨 Section Background',
              options: { collapsible: true, collapsed: false },
            },
            {
              name: 'colors',
              title: '🎨 Text Colors',
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            // Background type toggle
            {
              name: 'backgroundType',
              title: 'Background Type',
              type: 'string',
              fieldset: 'background',
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
            // Shared fields (always visible)
            {
              name: 'title',
              title: 'Title',
              type: 'portableText',
              fieldset: 'content',
              validation: (Rule) => Rule.required(),
            },
            // Image mode fields
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              fieldset: 'background',
              description: 'Full-width background image.',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the image for accessibility',
                  validation: (Rule) => Rule.required(),
                },
              ],
              hidden: ({ parent }: { parent: { backgroundType?: string } }) =>
                parent?.backgroundType === 'color',
            },
            {
              name: 'textPosition',
              title: 'Title Position',
              type: 'string',
              fieldset: 'content',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'left',
              hidden: ({ parent }: { parent: { backgroundType?: string } }) =>
                parent?.backgroundType === 'color',
            },
            // Color mode fields
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'portableText',
              fieldset: 'content',
              description:
                'Optional subtitle below the title. Use italic for script font styling.',
              hidden: ({ parent }: { parent: { backgroundType?: string } }) =>
                parent?.backgroundType !== 'color',
            },
            // Background color fields (only for color mode)
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'background',
              hidden: ({
                parent,
              }: {
                parent: {
                  backgroundType?: string;
                  backgroundColorMode?: string;
                  backgroundColorType?: string;
                };
              }) => {
                // First check if we're in image mode
                if (parent?.backgroundType !== 'color') return true;
                // Then apply original hidden logic if it exists
                const originalHidden = field.hidden as
                  | ((args: {
                      parent: {
                        backgroundColorMode?: string;
                        backgroundColorType?: string;
                      };
                    }) => boolean)
                  | undefined;
                if (originalHidden) {
                  return originalHidden({ parent });
                }
                return false;
              },
            })),
            // Title color (always visible)
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
              initialValue: 'primary',
            },
            {
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType !== 'custom',
            },
            // Subtitle color (only for color mode)
            {
              name: 'subtitleColorType',
              title: 'Subtitle Color',
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
              initialValue: 'secondary',
              hidden: ({ parent }: { parent: { backgroundType?: string } }) =>
                parent?.backgroundType !== 'color',
            },
            {
              name: 'subtitleColorShade',
              title: 'Subtitle Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({
                parent,
              }: {
                parent: {
                  backgroundType?: string;
                  subtitleColorType?: string;
                };
              }) =>
                parent?.backgroundType !== 'color' ||
                parent?.subtitleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'subtitleCustomColor',
              title: 'Custom Subtitle Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({
                parent,
              }: {
                parent: {
                  backgroundType?: string;
                  subtitleColorType?: string;
                };
              }) =>
                parent?.backgroundType !== 'color' ||
                parent?.subtitleColorType !== 'custom',
            },
          ],
          preview: {
            select: {
              backgroundType: 'backgroundType',
              media: 'image',
            },
            prepare({ backgroundType, media }) {
              return {
                title: 'Section Title',
                subtitle:
                  backgroundType === 'color'
                    ? 'Color background'
                    : 'Image background',
                media: backgroundType === 'image' ? media : undefined,
              };
            },
          },
        }),

        // ==========================================
        // CENTERED TEXT SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'centeredText',
          title: 'Centered Text',
          icon: () => '📄',
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
            {
              name: 'title',
              title: 'Title (optional)',
              type: 'string',
              fieldset: 'content',
              description: 'Optional heading above the text',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'portableText',
              fieldset: 'content',
              description: 'The main text content',
            },
            // Background color fields first
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
            })),
            // Title color
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
              initialValue: 'primary',
            },
            {
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType !== 'custom',
            },
            {
              name: 'textColor',
              title: 'Text Color',
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
            prepare() {
              return {
                title: 'Centered Text',
              };
            },
          },
        }),

        // ==========================================
        // TWO COLUMN SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'twoColumn',
          title: 'Two Column',
          icon: () => '⬛⬜',
          fieldsets: [
            {
              name: 'layout',
              title: '📐 Columns Layout',
              options: { collapsible: true, collapsed: false },
            },
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
            // Layout fields first
            {
              name: 'imagePosition',
              title: 'Where should the text appear?',
              type: 'string',
              fieldset: 'layout',
              options: {
                list: [
                  { title: 'Left Column', value: 'right' },
                  { title: 'Right Column', value: 'left' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'right',
            },
            {
              name: 'titlePosition',
              title: 'Title Position',
              type: 'string',
              fieldset: 'layout',
              options: {
                list: [
                  { title: 'Above Image', value: 'image' },
                  { title: 'Above Text', value: 'text' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'image',
            },
            // Content fields
            {
              name: 'title',
              title: 'Title (optional)',
              type: 'string',
              fieldset: 'content',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'portableText',
              fieldset: 'content',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              fieldset: 'content',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'secondaryImage',
              title: 'Secondary Image (below text)',
              type: 'image',
              fieldset: 'content',
              description: 'Optional image that appears below the text content',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            // Background color fields first
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              // Rename "Background Mode" to "Background Color"
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
            })),
            // Title color
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
              initialValue: 'primary',
            },
            {
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType !== 'custom',
            },
            {
              name: 'textColor',
              title: 'Text Color',
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
              media: 'image',
            },
            prepare({ media }) {
              return {
                title: 'Two Column Images and Text',
                media,
              };
            },
          },
        }),

        // ==========================================
        // QUOTE BANNER SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'quoteBanner',
          title: 'Quote Banner',
          icon: () => '💬',
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
            {
              name: 'quote',
              title: 'Quote Text',
              type: 'text',
              rows: 3,
              fieldset: 'content',
              validation: (Rule) => Rule.required(),
            },
            // Background color fields first
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
              // Override defaults for quote banner
              ...(field.name === 'backgroundColorType' && {
                initialValue: 'accent',
              }),
              ...(field.name === 'backgroundColorShade' && {
                initialValue: 85,
              }),
            })),
            {
              name: 'textColor',
              title: 'Text Color',
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
              initialValue: 'base',
            },
          ],
          preview: {
            prepare() {
              return {
                title: 'Quote Banner',
              };
            },
          },
        }),

        // ==========================================
        // FULL WIDTH IMAGE SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'fullWidthImage',
          title: 'Full Width Image',
          icon: () => '🌄',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: 'image',
            },
            prepare({ media }) {
              return {
                title: 'Full Width Image',
                media,
              };
            },
          },
        }),

        // ==========================================
        // TWO PHOTOS SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'twoPhotos',
          title: 'Two Photos Side by Side',
          icon: () => '🖼️🖼️',
          fieldsets: [
            {
              name: 'colors',
              title: '🎨 Colors',
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            {
              name: 'images',
              title: 'Photos',
              type: 'array',
              description: 'Add exactly 2 photos',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.min(2).max(2).error('Exactly 2 photos required'),
            },
            // Background color fields
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
            })),
          ],
          preview: {
            select: {
              media: 'images.0',
            },
            prepare({ media }) {
              return {
                title: 'Two Photos',
                media,
              };
            },
          },
        }),

        // ==========================================
        // TEXT WRAP SECTION (Magazine-style)
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'textWrap',
          title: 'Text Wrap (Magazine Style)',
          icon: () => '📰',
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
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              fieldset: 'content',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'portableText',
              fieldset: 'content',
            },
            {
              name: 'images',
              title: 'Images (Right Side)',
              type: 'array',
              fieldset: 'content',
              description:
                'Add exactly 2 images. First = top (narrower), Second = bottom (wider, overlaps first).',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.min(2).max(2).error('Exactly 2 images required'),
            },
            // Background color fields first
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
            })),
            // Title color
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
              initialValue: 'primary',
            },
            {
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType !== 'custom',
            },
            {
              name: 'textColor',
              title: 'Text Color',
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
              media: 'images.0',
            },
            prepare({ media }) {
              return {
                title: 'Text Wrapping Images',
                media,
              };
            },
          },
        }),

        // ==========================================
        // IMAGE CONTAIN TEST SECTION
        // ==========================================
        defineArrayMember({
          type: 'object',
          name: 'imageContainTest',
          title: 'Image Contain Test',
          icon: () => '🧪',
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
            {
              name: 'title',
              title: 'Title',
              type: 'portableText',
              fieldset: 'content',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              fieldset: 'content',
              description: 'Image will display with object-fit: contain.',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              fieldset: 'content',
              description: 'Choose which side the image appears on',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'right',
            },
            // Background color fields
            ...backgroundColorFields.map((field) => ({
              ...field,
              fieldset: 'colors',
              ...(field.name === 'backgroundColorMode' && {
                title: 'Background Color',
              }),
            })),
            // Title color
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
              initialValue: 'primary',
            },
            {
              name: 'titleColorShade',
              title: 'Title Shade',
              type: 'number',
              fieldset: 'colors',
              initialValue: 0,
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType === 'custom',
              validation: (Rule) => Rule.min(0).max(100).integer(),
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'titleCustomColor',
              title: 'Custom Title Color',
              type: 'simplerColor',
              fieldset: 'colors',
              hidden: ({ parent }: { parent: { titleColorType?: string } }) =>
                parent?.titleColorType !== 'custom',
            },
          ],
          preview: {
            select: {
              media: 'image',
            },
            prepare({ media }) {
              return {
                title: 'Image Contain Test',
                media,
              };
            },
          },
        }),
      ],
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
