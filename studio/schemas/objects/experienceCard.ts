import { defineType } from 'sanity';

export default defineType({
  name: 'experienceCard',
  title: 'Experience Card',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'e.g., "20+", "100+", "15"',
      validation: (Rule) => Rule.required().max(20),
      placeholder: '20+',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading for this card',
      validation: (Rule) => Rule.required().max(100),
      placeholder: 'Years of Experience',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description for this card',
      validation: (Rule) => Rule.required().max(250),
      placeholder: 'Delivering excellence since 2003',
    },
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      description: 'description',
    },
    prepare({ title, number, description }) {
      const subtitle = number
        ? `${number} - ${description?.substring(0, 40) || 'No description'}${description && description.length > 40 ? '...' : ''}`
        : description?.substring(0, 60) || 'No description';

      return {
        title: title || 'Untitled card',
        subtitle,
      };
    },
  },
});
