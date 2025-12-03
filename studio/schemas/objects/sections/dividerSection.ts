import { defineType } from 'sanity';

export default defineType({
  name: 'dividerSection',
  title: 'Section Divider',
  type: 'object',
  fieldsets: [
    {
      name: 'colorSettings',
      title: 'Divider Color',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Show this divider',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this divider on the page',
    },
    {
      name: 'style',
      title: 'Divider Style',
      type: 'string',
      options: {
        list: [
          { title: 'Line with Diamond', value: 'line-diamond' },
          { title: 'Line with Dot', value: 'line-dot' },
          { title: 'Simple Line', value: 'line' },
          { title: 'Three Dots', value: 'dots' },
        ],
        layout: 'radio',
      },
      initialValue: 'line-diamond',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'spacing',
      title: 'Vertical Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'md',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'accentColorType',
      title: 'Color',
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
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'colorSettings',
    },
    {
      name: 'accentCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.accentColorType !== 'custom',
      fieldset: 'colorSettings',
    },
  ],
  preview: {
    select: {
      style: 'style',
      enabled: 'enabled',
    },
    prepare({ style, enabled }) {
      const status = enabled ? '✓' : '✗';
      const styleLabels: Record<string, string> = {
        'line-diamond': '◇ Line with Diamond',
        'line-dot': '• Line with Dot',
        line: '— Simple Line',
        dots: '••• Three Dots',
      };
      const displayStyle = styleLabels[style] || 'Divider';
      const subtitle = enabled ? '' : 'Hidden from site';

      return {
        title: `${status} ${displayStyle}`,
        subtitle,
      };
    },
  },
});
