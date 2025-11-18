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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.max(6).required().min(1),
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
