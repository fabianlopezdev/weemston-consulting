import { defineType } from 'sanity';

export default defineType({
  name: 'featuredCaseStudiesSection',
  title: 'Featured Case Studies Section',
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
      initialValue: 'Case Studies',
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
      name: 'caseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          if (!value || value.length === 0) {
            return 'At least 1 case study required when section is enabled';
          }
          if (value.length > 6) {
            return 'Maximum 6 case studies allowed';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'showAllLink',
      title: 'Show "View All Case Studies" Link (optional)',
      type: 'boolean',
      description: 'Display a link to view all case studies',
      initialValue: true,
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      caseStudiesCount: 'caseStudies.length',
    },
    prepare({ title, enabled, caseStudiesCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Featured Case Studies';
      const subtitle = enabled
        ? `${caseStudiesCount || 0} case ${caseStudiesCount !== 1 ? 'studies' : 'study'} selected`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
