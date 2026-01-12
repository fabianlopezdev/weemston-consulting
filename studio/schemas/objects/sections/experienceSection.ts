import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'experienceSection',
  title: 'Experience Section',
  type: 'object',
  fieldsets: [
    {
      name: 'background',
      title: 'Background',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'descriptionSettings',
      title: 'Section Description (optional)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'orbitalColors',
      title: 'Section Colors',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'cardDescriptionSettings',
      title: 'Card Description',
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
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Experience',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'description',
      title: 'Text',
      type: 'text',
      rows: 3,
      description: 'Brief description for the section',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'descriptionSettings',
    },
    {
      name: 'descriptionColor',
      title: 'Text Color',
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
      fieldset: 'descriptionSettings',
    },
    // Selected Item (Active Nav) Color Settings
    {
      name: 'badgeColorType',
      title: 'Badge Border Color',
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
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeColorShade',
      title: 'Badge Border Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.badgeColorType === 'custom' ||
        parent?.badgeColorType === 'default' ||
        !parent?.badgeColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeCustomColor',
      title: 'Custom Badge Border Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.badgeColorType !== 'custom',
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeBackgroundColorType',
      title: 'Badge Background Color',
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
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeBackgroundColorShade',
      title: 'Badge Background Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.badgeBackgroundColorType === 'custom' ||
        parent?.badgeBackgroundColorType === 'default' ||
        !parent?.badgeBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeBackgroundCustomColor',
      title: 'Custom Badge Background Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.badgeBackgroundColorType !== 'custom',
      fieldset: 'orbitalColors',
    },
    {
      name: 'circleBackgroundColorType',
      title: 'Circle Background Color',
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
      fieldset: 'orbitalColors',
    },
    {
      name: 'circleBackgroundColorShade',
      title: 'Circle Background Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.circleBackgroundColorType === 'custom' ||
        parent?.circleBackgroundColorType === 'default' ||
        !parent?.circleBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'orbitalColors',
    },
    {
      name: 'circleBackgroundCustomColor',
      title: 'Custom Circle Background Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.circleBackgroundColorType !== 'custom',
      fieldset: 'orbitalColors',
    },
    {
      name: 'badgeTextColor',
      title: 'Badge Text Color',
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
      fieldset: 'orbitalColors',
    },
    {
      name: 'circleTextColor',
      title: 'Circle Text Color',
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
      fieldset: 'orbitalColors',
    },
    // Card Description Color
    {
      name: 'cardDescriptionColor',
      title: 'Text Color',
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
      fieldset: 'cardDescriptionSettings',
    },
    // Experience Cards
    {
      name: 'cards',
      title: 'Experience Cards',
      type: 'array',
      of: [{ type: 'experienceCard' }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          const items = value as unknown[] | undefined;
          if (!items || items.length === 0) {
            return 'At least 1 card required when section is enabled';
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
      cardsCount: 'cards.length',
      media: 'backgroundImage',
    },
    prepare({ title, enabled, cardsCount, media }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Experience';
      const subtitle = enabled
        ? `${cardsCount || 0} card${cardsCount !== 1 ? 's' : ''}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
        media,
      };
    },
  },
});
