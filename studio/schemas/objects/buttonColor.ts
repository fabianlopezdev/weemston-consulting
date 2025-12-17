import { defineType } from 'sanity';
import { ButtonColorInput } from '../../components/ButtonColorInput';

export default defineType({
  name: 'buttonColor',
  title: 'Button Color',
  type: 'object',
  components: {
    input: ButtonColorInput,
  },
  fields: [
    {
      name: 'colorType',
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
    },
    {
      name: 'customColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) => parent?.colorType !== 'custom',
    },
    {
      name: 'shade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(100).integer(),
    },
    {
      name: 'useBaseTextColor',
      title: 'Text Color',
      type: 'boolean',
      initialValue: false, // false = contrast (white), true = base (black)
    },
  ],
  preview: {
    select: {
      colorType: 'colorType',
      shade: 'shade',
      customColor: 'customColor',
    },
    prepare({ colorType, shade, customColor }) {
      const colorLabels: Record<string, string> = {
        primary: 'Primary',
        secondary: 'Secondary',
        accent: 'Accent',
        custom: 'Custom',
      };

      const label = colorLabels[colorType] || 'Accent';
      const shadeValue = shade ?? 0;
      const shadeLabel =
        colorType !== 'custom' && shadeValue > 0
          ? ` (${shadeValue}% lighter)`
          : '';
      const customLabel =
        colorType === 'custom' && customColor?.value
          ? ` (${customColor.value})`
          : '';

      return {
        title: 'Button Color',
        subtitle: `${label}${shadeLabel}${customLabel}`,
      };
    },
  },
});
