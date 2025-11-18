import { defineType } from 'sanity';

export default defineType({
  name: 'buttonColor',
  title: 'Button Color',
  type: 'object',
  fields: [
    {
      name: 'colorType',
      title: 'Color Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (from site settings)', value: 'primary' },
          { title: 'Secondary (from site settings)', value: 'secondary' },
          { title: 'Accent (from site settings)', value: 'accent' },
          { title: 'Custom Color', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'accent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) => parent?.colorType !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { colorType?: string };
          if (parent?.colorType === 'custom' && !value) {
            return 'Custom color is required when "Custom Color" is selected';
          }
          return true;
        }),
    },
  ],
  preview: {
    select: {
      colorType: 'colorType',
      customColor: 'customColor.value',
    },
    prepare({ colorType, customColor }) {
      let subtitle = '';

      switch (colorType) {
        case 'primary':
          subtitle = 'Primary (from site settings)';
          break;
        case 'secondary':
          subtitle = 'Secondary (from site settings)';
          break;
        case 'accent':
          subtitle = 'Accent (from site settings)';
          break;
        case 'custom':
          subtitle = customColor ? `Custom: ${customColor}` : 'Custom color';
          break;
        default:
          subtitle = 'Button color';
      }

      return {
        title: 'Button Color',
        subtitle,
      };
    },
  },
});
