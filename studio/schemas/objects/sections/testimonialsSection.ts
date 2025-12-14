import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fieldsets: [
    {
      name: 'background',
      title: 'Section Background',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'cardBackground',
      title: 'Card Background Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'cardBorder',
      title: 'Card Border Color',
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
    // Background Type Toggle
    {
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Color', value: 'color' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'color',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'background',
    },
    // Background Image (shown only when type is 'image')
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description:
        'Recommended: 1920x1080 or larger. A dark overlay will be applied for text legibility.',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundType !== 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'SEO Filename (optional)',
          type: 'string',
          description:
            'Custom filename for SEO (e.g., "team-working-together")',
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
        !parent?.enabled || parent?.backgroundType === 'image',
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
    // Solid Color Settings (shown only when type is 'color' and mode is 'solid')
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
    // Card Background Color Settings
    {
      name: 'cardBackgroundColorType',
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
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'cardBackground',
    },
    {
      name: 'cardBackgroundColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.cardBackgroundColorType === 'custom' ||
        parent?.cardBackgroundColorType === 'default' ||
        !parent?.cardBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'cardBackground',
    },
    {
      name: 'cardBackgroundCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.cardBackgroundColorType !== 'custom',
      fieldset: 'cardBackground',
    },
    // Card Border Color Settings
    {
      name: 'cardBorderColorType',
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
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'cardBorder',
    },
    {
      name: 'cardBorderColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.cardBorderColorType === 'custom' ||
        parent?.cardBorderColorType === 'default' ||
        !parent?.cardBorderColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'cardBorder',
    },
    {
      name: 'cardBorderCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.cardBorderColorType !== 'custom',
      fieldset: 'cardBorder',
    },
    // Title Color (shown when background is image)
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
      description:
        'Base uses the accent color for this title (default for titles across the site). Contrast uses white for readability over dark images.',
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
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundType !== 'image',
      fieldset: 'textSettings',
    },
    // Text Color (card text)
    {
      name: 'textColor',
      title: 'Card Text Color',
      type: 'string',
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
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'textSettings',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What Our Clients Say',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          if (!value || value.length === 0) {
            return 'At least 1 testimonial required when section is enabled';
          }
          if (value.length > 6) {
            return 'Maximum 6 testimonials allowed';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      testimonialsCount: 'testimonials.length',
      backgroundType: 'backgroundType',
    },
    prepare({ title, enabled, testimonialsCount, backgroundType }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Testimonials';
      const bgInfo = backgroundType === 'image' ? ' (image bg)' : '';
      const subtitle = enabled
        ? `${testimonialsCount || 0} testimonial${testimonialsCount !== 1 ? 's' : ''} selected${bgInfo}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
