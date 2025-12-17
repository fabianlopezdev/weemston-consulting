import { createElement } from 'react';
import { Icon } from '@iconify/react';
import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'approachValueCard',
  title: 'Value Card',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      description: 'Search for an icon from 150,000+ available icons',
    },
    {
      name: 'iconColorType',
      title: 'Icon Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'iconColorShade',
      title: 'Icon Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) => parent?.iconColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconCustomColor',
      title: 'Custom Icon Color',
      type: 'simplerColor',
      hidden: ({ parent }) => parent?.iconColorType !== 'custom',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'titleColorType',
      title: 'Title Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'titleColorShade',
      title: 'Title Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) => parent?.titleColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'titleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      hidden: ({ parent }) => parent?.titleColorType !== 'custom',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      iconName: 'icon.name',
    },
    prepare({ title, iconName }) {
      return {
        title: title || 'Untitled Card',
        subtitle: iconName ? `Icon: ${iconName}` : 'No icon selected',
        media: iconName ? createElement(Icon, { icon: iconName }) : undefined,
      };
    },
  },
});
