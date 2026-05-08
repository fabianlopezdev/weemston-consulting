import { defineType } from 'sanity';

export default defineType({
  name: 'navigationGroup',
  title: 'Navigation Group',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Group Label',
      type: 'string',
      description:
        'Heading text shown in the header dropdown trigger and as the footer column heading. The group itself is not clickable.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'children',
      title: 'Child Links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      validation: (Rule) => Rule.min(1).max(6),
    },
  ],
  preview: {
    select: {
      label: 'label',
      children: 'children',
    },
    prepare({ label, children }) {
      const count = Array.isArray(children) ? children.length : 0;
      return {
        title: label || 'Untitled group',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      };
    },
  },
});
