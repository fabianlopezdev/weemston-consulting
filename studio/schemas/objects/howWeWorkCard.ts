import { createElement } from 'react';
import { Icon } from '@iconify/react';
import { defineType } from 'sanity';

export default defineType({
  name: 'howWeWorkCard',
  title: 'How We Work Card',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Visual Type (optional)',
      type: 'string',
      description: 'Choose to add an icon or image, or leave empty',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Icon Library', value: 'icon' },
          { title: 'Upload Image', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
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
            'Improves image SEO by giving Google a descriptive filename (e.g., "discovery-planning-step" instead of "IMG_1234"). Use lowercase with hyphens, no spaces or special characters.',
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
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading for this card',
      validation: (Rule) => Rule.required().max(100),
      placeholder: 'Discovery & Planning',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description for this card',
      validation: (Rule) => Rule.required().max(250),
      placeholder: 'We start by understanding your goals and challenges',
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      type: 'type',
      image: 'image',
      iconName: 'icon.name',
    },
    prepare({ title, description, type, image, iconName }) {
      const subtitle = description?.substring(0, 60) || 'No description';

      // Determine media based on type
      let media;
      if (type === 'image' && image) {
        media = image;
      } else if (type === 'icon' && iconName) {
        media = createElement(Icon, { icon: iconName });
      }

      return {
        title: title || 'Untitled card',
        subtitle:
          description && description.length > 60 ? `${subtitle}...` : subtitle,
        media,
      };
    },
  },
});
