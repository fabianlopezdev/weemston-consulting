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
        ],
      },
      initialValue: 'accent',
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
    },
    prepare({ colorType, shade }) {
      const colorLabels: Record<string, string> = {
        primary: 'Primary',
        secondary: 'Secondary',
        accent: 'Accent',
      };

      const label = colorLabels[colorType] || 'Accent';
      const shadeValue = shade ?? 0;
      const shadeLabel = shadeValue > 0 ? ` (${shadeValue}% lighter)` : '';

      return {
        title: 'Button Color',
        subtitle: `${label}${shadeLabel}`,
      };
    },
  },
});
