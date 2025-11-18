import { defineType } from 'sanity';

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
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
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer',
            },
            prepare({ question, answer }) {
              return {
                title: question || 'Untitled question',
                subtitle: answer
                  ? answer.substring(0, 60) + '...'
                  : 'No answer',
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          if (!value || value.length === 0) {
            return 'At least 1 FAQ item required when section is enabled';
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
      faqsCount: 'faqs.length',
    },
    prepare({ title, enabled, faqsCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'FAQ';
      const subtitle = enabled
        ? `${faqsCount || 0} question${faqsCount !== 1 ? 's' : ''}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
