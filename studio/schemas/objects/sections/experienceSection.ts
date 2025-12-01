import { defineType } from 'sanity';
import { BackgroundShadeInput } from '../../../components/BackgroundShadeInput';

export default defineType({
  name: 'experienceSection',
  title: 'Experience Section',
  type: 'object',
  fieldsets: [
    {
      name: 'background',
      title: 'Background Color',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'descriptionSettings',
      title: 'Section Description (optional)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'selectedItemSettings',
      title: 'Selected Item (Active Nav)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'cardDescriptionSettings',
      title: 'Card Description',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'ctaSettings',
      title: 'CTA Button (optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'enabled',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this section on the homepage',
    },
    // Background Color Settings (moved above title)
    {
      name: 'backgroundColorType',
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
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'background',
    },
    {
      name: 'backgroundColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'background',
    },
    {
      name: 'backgroundCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.backgroundColorType !== 'custom',
      fieldset: 'background',
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Experience',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;
          return value ? true : 'Title is required when section is enabled';
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: 'description',
      title: 'Text',
      type: 'text',
      rows: 3,
      description: 'Brief description for the section',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'descriptionSettings',
    },
    {
      name: 'descriptionColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'descriptionSettings',
    },
    // Selected Item (Active Nav) Color Settings
    {
      name: 'selectedItemColorType',
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
      fieldset: 'selectedItemSettings',
    },
    {
      name: 'selectedItemColorShade',
      title: 'Shade',
      type: 'number',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.selectedItemColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
      fieldset: 'selectedItemSettings',
    },
    {
      name: 'selectedItemCustomColor',
      title: 'Custom Color',
      type: 'simplerColor',
      hidden: ({ parent }) =>
        !parent?.enabled || parent?.selectedItemColorType !== 'custom',
      fieldset: 'selectedItemSettings',
    },
    // Card Description Color
    {
      name: 'cardDescriptionColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'cardDescriptionSettings',
    },
    // CTA Button
    {
      name: 'ctaButton',
      title: 'Button',
      type: 'link',
      description: 'Call to action button shown on each card',
      hidden: ({ parent }) => !parent?.enabled,
      fieldset: 'ctaSettings',
    },
    // Experience Cards
    {
      name: 'cards',
      title: 'Experience Cards',
      type: 'array',
      of: [{ type: 'experienceCard' }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { enabled?: boolean };
          if (!parent?.enabled) return true;

          if (!value || value.length === 0) {
            return 'At least 1 card required when section is enabled';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.enabled,
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      cardsCount: 'cards.length',
    },
    prepare({ title, enabled, cardsCount }) {
      const status = enabled ? '✓' : '✗';
      const displayTitle = title || 'Experience';
      const subtitle = enabled
        ? `${cardsCount || 0} card${cardsCount !== 1 ? 's' : ''}`
        : 'Hidden from site';

      return {
        title: `${status} ${displayTitle}`,
        subtitle,
      };
    },
  },
});
