import { defineType } from 'sanity';

export default defineType({
  name: 'ourApproachSection',
  title: 'Our Approach Section',
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
      initialValue: 'Our Approach',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'intro',
      title: 'Intro Line (optional)',
      type: 'text',
      rows: 2,
      description: 'A brief introductory line that appears below the title',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Content is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
    },
    prepare({ title, enabled }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Our Approach';
      const subtitle = enabled ? 'Content section' : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
