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
      description:
        'For best performance, use WebP format. Convert at anywebp.com or squoosh.app',
      options: {
        hotspot: true,
      },
      fieldsets: [
        {
          name: 'seoFilename',
          title: 'SEO Filename (optional)',
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the image for screen readers and search engines. Be specific and include relevant keywords naturally.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'Custom Filename',
          type: 'string',
          description:
            'Improves image SEO by giving Google a descriptive filename instead of "IMG_1234". Use lowercase with hyphens, no spaces or special characters.',
          fieldset: 'seoFilename',
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
