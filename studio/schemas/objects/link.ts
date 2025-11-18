import { defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Link Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'external',
      title: 'External Link (optional)',
      type: 'boolean',
      description: 'Opens in a new tab',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      text: 'text',
      href: 'href',
    },
    prepare({ text, href }) {
      return {
        title: text,
        subtitle: href,
      };
    },
  },
});
