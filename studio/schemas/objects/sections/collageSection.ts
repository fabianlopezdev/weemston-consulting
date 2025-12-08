import { defineType } from 'sanity';

export default defineType({
  name: 'collageSection',
  title: 'Collage Section',
  type: 'object',
  fieldsets: [
    {
      name: 'text',
      title: 'Tagline Text',
    },
    {
      name: 'images',
      title: 'Collage Images',
      description:
        'Add images that will display in a seamless horizontal strip behind the tagline.',
    },
    {
      name: 'overlay',
      title: 'Text Overlay Style',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Toggle this section on or off',
      initialValue: true,
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description:
        'The statement that will appear overlaid on the image collage',
      fieldset: 'text',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (parent?.enabled && !value) {
            return 'Tagline is required when section is enabled';
          }
          return true;
        }),
    },
    {
      name: 'taglineSize',
      title: 'Tagline Size',
      type: 'string',
      fieldset: 'text',
      options: {
        list: [
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'xlarge' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      fieldset: 'images',
      description:
        'Add 3-8 images for the collage strip. Images will be displayed in a 16:9 aspect ratio.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describes the image for screen readers and SEO',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (parent?.enabled) {
            if (!value || (value as unknown[]).length < 3) {
              return 'At least 3 images are required when section is enabled';
            }
            if ((value as unknown[]).length > 8) {
              return 'Maximum 8 images allowed';
            }
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'overlayStyle',
      title: 'Overlay Style',
      type: 'string',
      fieldset: 'overlay',
      options: {
        list: [
          { title: 'Frosted Glass', value: 'frosted' },
          { title: 'Dark Gradient', value: 'gradient' },
          { title: 'Solid Dark', value: 'solid' },
        ],
        layout: 'radio',
      },
      initialValue: 'frosted',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      fieldset: 'overlay',
      description: 'Adjust the darkness of the overlay (0-100)',
      initialValue: 60,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      tagline: 'tagline',
      enabled: 'enabled',
      images: 'images',
    },
    prepare({ tagline, enabled, images }) {
      const imageCount = images?.length || 0;
      return {
        title: tagline || 'Collage Section',
        subtitle: `${enabled ? 'Enabled' : 'Disabled'} · ${imageCount} image${imageCount !== 1 ? 's' : ''}`,
        media: images?.[0],
      };
    },
  },
});
