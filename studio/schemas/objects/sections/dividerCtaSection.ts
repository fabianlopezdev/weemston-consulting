import { defineType } from 'sanity';

export default defineType({
  name: 'dividerCtaSection',
  title: 'Divider with CTA',
  type: 'object',
  fieldsets: [
    {
      name: 'lineColor',
      title: 'Line Color',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this divider on the page',
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'link',
      description: 'The button that appears centered on the divider line',
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'spacing',
      title: 'Vertical Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
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
      name: 'lineColorType',
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
      fieldset: 'lineColor',
    },
    {
      name: 'lineCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.lineColorType !== 'custom',
      fieldset: 'lineColor',
    },
  ],
  preview: {
    select: {
      buttonText: 'ctaButton.text',
      enabled: 'enabled',
    },
    prepare({ buttonText, enabled }) {
      const status = enabled ? '✓' : '✗';
      const subtitle = enabled ? '' : 'Hidden from site';

      return {
        title: `${status} Divider: ${buttonText || 'No button text'}`,
        subtitle,
      };
    },
  },
});
