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
      type: 'string',
      options: {
        list: [
          { title: 'Search (Magnifying Glass)', value: 'search' },
          { title: 'Layers (Stack)', value: 'layers' },
          { title: 'Lightbulb (Idea)', value: 'lightbulb' },
          { title: 'Users (People)', value: 'users' },
          { title: 'Heart', value: 'heart' },
          { title: 'Chart (Growth)', value: 'chart' },
          { title: 'Target (Goal)', value: 'target' },
          { title: 'Compass (Direction)', value: 'compass' },
          { title: 'Handshake (Partnership)', value: 'handshake' },
          { title: 'Star (Excellence)', value: 'star' },
          { title: 'Shield (Trust)', value: 'shield' },
          { title: 'Puzzle (Problem Solving)', value: 'puzzle' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'search',
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
      icon: 'icon',
    },
    prepare({ title, icon }) {
      const iconEmojis: Record<string, string> = {
        search: '🔍',
        layers: '📚',
        lightbulb: '💡',
        users: '👥',
        heart: '❤️',
        chart: '📈',
        target: '🎯',
        compass: '🧭',
        handshake: '🤝',
        star: '⭐',
        shield: '🛡️',
        puzzle: '🧩',
      };
      return {
        title: title || 'Untitled Card',
        subtitle: `Icon: ${icon || 'none'}`,
        media: () => iconEmojis[icon] || '📋',
      };
    },
  },
});
