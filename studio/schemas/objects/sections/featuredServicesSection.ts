import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'featuredServicesSection',
  title: 'Featured Services Section',
  type: 'object',
  fieldsets: [
    {
      name: 'background',
      title: 'Background Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'titleSettings',
      title: 'Card Title Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'accentSettings',
      title: 'Card Background Color',
      description: 'Cards use lighter versions of the selected color',
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
    // Background Color Settings
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
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'background',
    },
    {
      name: 'backgroundColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled ||
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
        !parent?.enabled || parent?.backgroundColorType !== 'custom',
      fieldset: 'background',
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
    // Text Color
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

          if (!value || value.length === 0) {
            return 'At least 1 service required when section is enabled';
          }
          if (value.length > 6) {
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
    },
    prepare({ title, enabled, servicesCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Featured Services';
      const subtitle = enabled
        ? `${servicesCount || 0} service${servicesCount !== 1 ? 's' : ''} selected`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
