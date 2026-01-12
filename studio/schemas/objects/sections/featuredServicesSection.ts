import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'featuredServicesSection',
  title: 'Featured Services Section',
  type: 'object',
  fieldsets: [
    // Section-level settings
    {
      name: 'background',
      title: 'Section Background',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'sectionTitleSettings',
      title: 'Section Title Color',
      description: 'Base uses accent color like other titles',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'descriptionSettings',
      title: 'Section Description Text Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'linkSettings',
      title: 'Section Link Text Color',
      options: { collapsible: true, collapsed: true },
    },
    // Card-level settings
    {
      name: 'accentSettings',
      title: 'Card Background Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'titleSettings',
      title: 'Card Title Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'cardTextSettings',
      title: 'Card Text Color',
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
    // Section Title Color
    {
      name: 'sectionTitleColor',
      title: 'Section Title Color',
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
      fieldset: 'sectionTitleSettings',
    },
    // Description Text Color
    {
      name: 'descriptionTextColor',
      title: 'Description Text Color',
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
    // Link Text Color
    {
      name: 'linkTextColor',
      title: 'Link Text Color',
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
      fieldset: 'linkSettings',
    },
    // Card Background Color Settings
    {
      name: 'accentColorType',
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
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'accentSettings',
    },
    {
      name: 'accentCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.accentColorType !== 'custom',
      fieldset: 'accentSettings',
    },
    // Card Title Color Settings
    {
      name: 'titleColorType',
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
      fieldset: 'titleSettings',
    },
    {
      name: 'titleColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
        parent?.titleColorType === 'custom' ||
        parent?.titleColorType === 'default' ||
        !parent?.titleColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'titleSettings',
    },
    {
      name: 'titleCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.titleColorType !== 'custom',
      fieldset: 'titleSettings',
    },
    // Card Text Color
    {
      name: 'cardTextColor',
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
      fieldset: 'cardTextSettings',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Services',
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
      title: 'Section Description (optional)',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'services',
      title: 'Featured Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          const items = value as unknown[] | undefined;
          if (!items || items.length === 0) {
            return 'At least 1 service required when section is enabled';
          }
          if (items.length > 6) {
            return 'Maximum 6 services allowed';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'showAllLink',
      title: 'Show "View All Services" Link (optional)',
      type: 'boolean',
      description: 'Display a link to view all services',
      initialValue: true,
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      servicesCount: 'services.length',
      media: 'backgroundImage',
    },
    prepare({ title, enabled, servicesCount, media }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Featured Services';
      const subtitle = enabled
        ? `${servicesCount || 0} service${servicesCount !== 1 ? 's' : ''} selected`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
        media,
      };
    },
  },
});
