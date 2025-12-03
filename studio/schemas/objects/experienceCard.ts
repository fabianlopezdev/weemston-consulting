import { createElement } from 'react';
import { Icon } from '@iconify/react';
import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

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
      name: 'iconOrImage',
      title: 'Icon or Image (optional)',
      type: 'iconOrImage',
      description: 'Add an icon or image to display with this card',
    },
    {
      name: 'iconBackgroundColorType',
      title: 'Icon Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'custom',
      hidden: ({ parent }) => parent?.iconOrImage?.type !== 'icon',
      description: 'Background color when using an icon instead of an image',
    },
    {
      name: 'iconBackgroundColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.iconOrImage?.type !== 'icon' ||
        parent?.iconBackgroundColorType === 'custom' ||
        !parent?.iconBackgroundColorType,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconBackgroundCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        parent?.iconOrImage?.type !== 'icon' ||
        parent?.iconBackgroundColorType !== 'custom',
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
      iconType: 'iconOrImage.type',
      image: 'iconOrImage.image',
      iconName: 'iconOrImage.icon.name',
    },
    prepare({ title, number, description, iconType, image, iconName }) {
      const subtitle = number
        ? `${number} - ${description?.substring(0, 40) || 'No description'}${description && description.length > 40 ? '...' : ''}`
        : description?.substring(0, 60) || 'No description';

      // Determine media based on type
      let media;
      if (iconType === 'image' && image) {
        media = image;
      } else if (iconType === 'icon' && iconName) {
        media = createElement(Icon, { icon: iconName });
      }

      return {
        title: title || 'Untitled card',
        subtitle,
        media,
      };
    },
  },
});
