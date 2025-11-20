import { createElement } from 'react';
import { Icon } from '@iconify/react';
import { defineType } from 'sanity';

export default defineType({
  name: 'iconOrImage',
  title: 'Icon or Image',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Icon Library', value: 'icon' },
          { title: 'Upload Image', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Select Icon',
      type: 'icon',
      description: 'Search for an icon from 150,000+ available icons',
      hidden: ({ parent }) => parent?.type !== 'icon',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'icon' && !value) {
            return 'Icon is required when type is Icon Library';
          }
          return true;
        }),
    },
    {
      name: 'image',
      title: 'Upload Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'image' && !value) {
            return 'Image is required when type is Upload Image';
          }
          return true;
        }),
    },
  ],
  preview: {
    select: {
      type: 'type',
      iconName: 'icon.name',
      image: 'image',
      alt: 'image.alt',
    },
    prepare({ type, iconName, image, alt }) {
      let media;
      if (type === 'image' && image) {
        media = image;
      } else if (type === 'icon' && iconName) {
        media = createElement(Icon, { icon: iconName });
      }

      return {
        title: type === 'icon' ? 'Icon' : 'Image',
        subtitle:
          type === 'icon'
            ? iconName || 'No icon selected'
            : alt || 'No alt text',
        media,
      };
    },
  },
});
