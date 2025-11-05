import { defineType } from 'sanity';

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
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
      initialValue: 'What Our Clients Say',
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      validation: (Rule) => Rule.max(6).required().min(1),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      testimonialsCount: 'testimonials.length',
    },
    prepare({ title, enabled, testimonialsCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Testimonials';
      const subtitle = enabled
        ? `${testimonialsCount || 0} testimonial${testimonialsCount !== 1 ? 's' : ''} selected`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
