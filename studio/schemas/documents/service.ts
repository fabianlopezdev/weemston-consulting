import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {
      name: 'homepage',
      title: '🏠 Homepage Display',
    },
    {
      name: 'servicePage',
      title: '📋 Service Page Display',
      default: true,
    },
  ],
  fieldsets: [
    {
      name: 'homepageContent',
      title: 'Homepage Content',
      description:
        'Content shown when this service is featured on the homepage',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'servicesPage',
      title: '⚙️ Main Settings',
      description: 'How this service appears on the dedicated services page',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'decorativeColors',
      title: '🎨 Decorative Colors',
      description: 'Colors for numbers and divider lines',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'listSection',
      title: '📝 List Section',
      description: 'Bulleted list to highlight key offerings',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'caseStudiesSection',
      title: '📁 Case Studies',
      description: 'Display related case studies below the image',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    defineLanguageField(),

    // Homepage Fields
    {
      name: 'homepageText',
      title: 'Homepage Text',
      type: 'portableText',
      group: 'homepage',
      fieldset: 'homepageContent',
      description:
        'Text to display when this service is featured on the homepage',
    },

    // Services Page Fields
    // Background Color
    {
      name: 'backgroundColorMode',
      title: 'Background Color Mode',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Gradient', value: 'gradient' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'solid',
    },
    {
      name: 'backgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.backgroundColorMode === 'gradient',
    },
    {
      name: 'backgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'servicesPage',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.backgroundColorType === 'custom' ||
        parent?.backgroundColorType === 'default' ||
        parent?.backgroundColorMode === 'gradient' ||
        !parent?.backgroundColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'backgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'servicesPage',
      hidden: ({ parent }) =>
        parent?.backgroundColorType !== 'custom' ||
        parent?.backgroundColorMode === 'gradient',
    },
    {
      name: 'backgroundGradient',
      title: 'Gradient',
      type: 'object',
      group: 'servicePage',
      fieldset: 'servicesPage',
      hidden: ({ parent }) => parent?.backgroundColorMode !== 'gradient',
      fields: [
        {
          name: 'direction',
          title: 'Direction',
          type: 'string',
          options: {
            list: [
              { title: 'Top to Bottom', value: 'to bottom' },
              { title: 'Bottom to Top', value: 'to top' },
              { title: 'Left to Right', value: 'to right' },
              { title: 'Right to Left', value: 'to left' },
              { title: 'Diagonal ↘', value: '135deg' },
              { title: 'Diagonal ↗', value: '45deg' },
            ],
          },
          initialValue: '135deg',
        },
        {
          name: 'startColor',
          title: 'Start Color',
          type: 'object',
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
              initialValue: 'primary',
            },
            {
              name: 'shade',
              title: 'Shade',
              type: 'number',
              initialValue: 0,
              hidden: ({ parent }) => parent?.colorType === 'custom',
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }) => parent?.colorType !== 'custom',
            },
          ],
        },
        {
          name: 'endColor',
          title: 'End Color',
          type: 'object',
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
              name: 'shade',
              title: 'Shade',
              type: 'number',
              initialValue: 0,
              hidden: ({ parent }) => parent?.colorType === 'custom',
              components: { input: BackgroundShadeInput },
            },
            {
              name: 'customColor',
              title: ' ',
              type: 'simplerColor',
              hidden: ({ parent }) => parent?.colorType !== 'custom',
            },
          ],
        },
      ],
    },

    // Title Color
    {
      name: 'titleColorType',
      title: 'Title Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
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
      group: 'servicePage',
      fieldset: 'servicesPage',
      initialValue: 0,
      hidden: ({ parent }) => parent?.titleColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'titleCustomColor',
      title: 'Custom Title Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'servicesPage',
      hidden: ({ parent }) => parent?.titleColorType !== 'custom',
    },

    // Subtitle
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'servicePage',
      fieldset: 'servicesPage',
      description: 'Bold introductory text below the title',
    },
    {
      name: 'subtitleColor',
      title: 'Subtitle Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.subtitle,
    },

    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'servicePage',
      fieldset: 'servicesPage',
      description: 'Main body text for this service',
    },
    {
      name: 'descriptionTextColor',
      title: 'Description Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'muted',
      hidden: ({ parent }) => !parent?.description,
    },

    // Image
    {
      name: 'iconType',
      title: 'Image Type',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    },
    {
      name: 'iconImage',
      title: 'Image',
      type: 'image',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
      hidden: ({ parent }) => parent?.iconType !== 'image',
    },
    {
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
      hidden: ({ parent }) => parent?.iconType === 'none',
    },

    // Decorative Colors
    {
      name: 'decorativeNumberColorType',
      title: 'Number Color',
      description:
        'Color for service numbers (01, 02) and list numbers (1., 2.)',
      type: 'string',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'decorativeNumberColorShade',
      title: 'Number Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.decorativeNumberColorType === 'custom' ||
        parent?.decorativeNumberColorType === 'default' ||
        !parent?.decorativeNumberColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'decorativeNumberCustomColor',
      title: 'Custom Number Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      hidden: ({ parent }) => parent?.decorativeNumberColorType !== 'custom',
    },
    {
      name: 'decorativeNumberHoverColorType',
      title: 'Number Hover Color',
      description: 'Color for service number on hover',
      type: 'string',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'decorativeNumberHoverColorShade',
      title: 'Number Hover Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.decorativeNumberHoverColorType === 'custom' ||
        parent?.decorativeNumberHoverColorType === 'default' ||
        !parent?.decorativeNumberHoverColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'decorativeNumberHoverCustomColor',
      title: 'Custom Number Hover Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      hidden: ({ parent }) =>
        parent?.decorativeNumberHoverColorType !== 'custom',
    },
    {
      name: 'dividerColorType',
      title: 'Divider Color',
      description: 'Color for list borders and section dividers',
      type: 'string',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'dividerColorShade',
      title: 'Divider Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.dividerColorType === 'custom' ||
        parent?.dividerColorType === 'default' ||
        !parent?.dividerColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'dividerCustomColor',
      title: 'Custom Divider Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'decorativeColors',
      hidden: ({ parent }) => parent?.dividerColorType !== 'custom',
    },

    // List Section
    {
      name: 'listTitle',
      title: 'List Title',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
      description: 'Heading above the list (e.g., "Key Offerings")',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      group: 'servicePage',
      fieldset: 'listSection',
      of: [{ type: 'text', rows: 2 }],
      description: 'Individual items in the list',
    },
    {
      name: 'listTextColor',
      title: 'List Text Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'base',
      hidden: ({ parent }) => !parent?.listItems?.length,
    },

    // Case Studies Section
    {
      name: 'caseStudiesSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      description:
        'Text above the case study buttons (e.g., "Clients that hire this service:")',
    },
    {
      name: 'caseStudiesTitleColorType',
      title: 'Section Title Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.caseStudiesSectionTitle,
    },
    {
      name: 'caseStudiesTitleColorShade',
      title: 'Section Title Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.caseStudiesSectionTitle ||
        parent?.caseStudiesTitleColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'caseStudiesTitleCustomColor',
      title: 'Custom Section Title Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      hidden: ({ parent }) =>
        !parent?.caseStudiesSectionTitle ||
        parent?.caseStudiesTitleColorType !== 'custom',
    },
    {
      name: 'logoDisplayMode',
      title: 'Logo Display Mode',
      type: 'string',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      description:
        'Use "Contrast" when section has a dark background to make logos visible',
      options: {
        list: [
          { title: 'Base (for light backgrounds)', value: 'base' },
          { title: 'Contrast (for dark backgrounds)', value: 'contrast' },
        ],
      },
      initialValue: 'base',
    },
    {
      name: 'featuredCaseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      group: 'servicePage',
      fieldset: 'caseStudiesSection',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      description: 'Select case studies to display as buttons',
    },
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title,
        subtitle: language?.toUpperCase() || '',
      };
    },
  },
});
