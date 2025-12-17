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
      name: 'listSection',
      title: '📝 List Section',
      description: 'Optional bulleted list to highlight key offerings',
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

    // Tag
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      description:
        'Small uppercase label above the title (e.g., "01", "Strategy")',
    },
    {
      name: 'tagColor',
      title: 'Tag Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.tag,
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

    // Lead Text
    {
      name: 'leadText',
      title: 'Lead Text',
      type: 'text',
      rows: 2,
      group: 'servicePage',
      fieldset: 'servicesPage',
      description: 'Bold introductory text below the title',
    },
    {
      name: 'leadTextColor',
      title: 'Lead Text Color',
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
      hidden: ({ parent }) => !parent?.leadText,
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

    // Image/Icon
    {
      name: 'iconType',
      title: 'Image Type',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Icon', value: 'svg' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'svg',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'servicePage',
      fieldset: 'servicesPage',
      options: {
        list: [
          { title: 'Settings (Gear)', value: 'settings' },
          { title: 'Target', value: 'target' },
          { title: 'Users (Team)', value: 'users' },
          { title: 'Chart (Analytics)', value: 'chart' },
          { title: 'Lightbulb (Ideas)', value: 'lightbulb' },
          { title: 'Handshake', value: 'handshake' },
          { title: 'Compass', value: 'compass' },
          { title: 'Calendar', value: 'calendar' },
          { title: 'Presentation', value: 'presentation' },
        ],
      },
      initialValue: 'settings',
      hidden: ({ parent }) =>
        parent?.iconType === 'image' || parent?.iconType === 'none',
    },
    {
      name: 'iconColorType',
      title: 'Icon Color',
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
      hidden: ({ parent }) =>
        parent?.iconType === 'image' || parent?.iconType === 'none',
    },
    {
      name: 'iconColorShade',
      title: 'Icon Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'servicesPage',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.iconType === 'image' ||
        parent?.iconType === 'none' ||
        parent?.iconColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconCustomColor',
      title: 'Custom Icon Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'servicesPage',
      hidden: ({ parent }) =>
        parent?.iconType === 'image' ||
        parent?.iconType === 'none' ||
        parent?.iconColorType !== 'custom',
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
      name: 'iconContainerColorType',
      title: 'Image/Icon Container Background',
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
      hidden: ({ parent }) => parent?.iconType === 'none',
    },
    {
      name: 'iconContainerColorShade',
      title: 'Container Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'servicesPage',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.iconType === 'none' ||
        parent?.iconContainerColorType === 'custom' ||
        parent?.iconContainerColorType === 'default' ||
        !parent?.iconContainerColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconContainerCustomColor',
      title: 'Custom Container Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'servicesPage',
      hidden: ({ parent }) =>
        parent?.iconType === 'none' ||
        parent?.iconContainerColorType !== 'custom',
    },
    {
      name: 'imagePosition',
      title: 'Image/Icon Position',
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

    // List Section
    {
      name: 'listTitle',
      title: 'List Title',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
      description: 'Optional heading above the list (e.g., "Key Offerings")',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      group: 'servicePage',
      fieldset: 'listSection',
      of: [{ type: 'string' }],
      description: 'Individual items in the list',
    },
    {
      name: 'listStyle',
      title: 'List Style',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
      options: {
        list: [
          { title: 'Checkmark', value: 'checkmark' },
          { title: 'Arrow', value: 'arrow' },
          { title: 'Bullet', value: 'bullet' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'checkmark',
      hidden: ({ parent }) => !parent?.listItems?.length,
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
    {
      name: 'listIconColorType',
      title: 'List Icon/Bullet Color',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.listItems?.length,
    },
    {
      name: 'listIconColorShade',
      title: 'List Icon Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'listSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.listItems?.length || parent?.listIconColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'listIconCustomColor',
      title: 'Custom List Icon Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'listSection',
      hidden: ({ parent }) =>
        !parent?.listItems?.length || parent?.listIconColorType !== 'custom',
    },
    {
      name: 'listContainerColorType',
      title: 'List Container Background',
      type: 'string',
      group: 'servicePage',
      fieldset: 'listSection',
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
      hidden: ({ parent }) => !parent?.listItems?.length,
    },
    {
      name: 'listContainerColorShade',
      title: 'List Container Shade',
      type: 'number',
      group: 'servicePage',
      fieldset: 'listSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.listItems?.length ||
        parent?.listContainerColorType === 'custom' ||
        parent?.listContainerColorType === 'default' ||
        !parent?.listContainerColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'listContainerCustomColor',
      title: 'Custom List Container Color',
      type: 'simplerColor',
      group: 'servicePage',
      fieldset: 'listSection',
      hidden: ({ parent }) =>
        !parent?.listItems?.length ||
        parent?.listContainerColorType !== 'custom',
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
      tag: 'tag',
      language: 'language',
    },
    prepare({ title, tag, language }) {
      return {
        title,
        subtitle: [tag, language?.toUpperCase()].filter(Boolean).join(' • '),
      };
    },
  },
});
