import { defineType } from 'sanity';

export default defineType({
  name: 'featuredServicesSection',
  title: 'Featured Services Section',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this section on the homepage',
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
