import { defineType } from 'sanity';

export default defineType({
  name: 'howWeWorkSection',
  title: 'How We Work Section',
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
      initialValue: 'How We Work',
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
      description: 'Brief description for the section',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'cards',
      title: 'How We Work Cards',
      type: 'array',
      of: [{ type: 'howWeWorkCard' }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          if (!value || value.length === 0) {
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
    },
    prepare({ title, enabled, cardsCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'How We Work';
      const subtitle = enabled
        ? `${cardsCount || 0} card${cardsCount !== 1 ? 's' : ''}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
