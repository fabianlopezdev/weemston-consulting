import { defineType } from 'sanity';

/**
 * Pull Quote — a block-level object inserted inline in PortableText (e.g.
 * inside a team member's bio). Renders as a centered italic Lora callout
 * between surrounding paragraphs on the frontend.
 */
export default defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 2,
      description:
        'A short, memorable line drawn from the surrounding bio. Keep it tight — one sentence reads best.',
      validation: (Rule) => Rule.required().min(5).max(220),
    },
  ],
  preview: {
    select: { text: 'text' },
    prepare({ text }) {
      const value = typeof text === 'string' ? text : '';
      const truncated =
        value.length > 60 ? `${value.slice(0, 60)}…` : value || '(empty)';
      return {
        title: `“${truncated}”`,
        subtitle: 'Pull Quote',
      };
    },
  },
});
