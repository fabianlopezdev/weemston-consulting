import { defineType } from 'sanity';

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
      name: 'title',
      title: 'Title',
      type: 'string',
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
