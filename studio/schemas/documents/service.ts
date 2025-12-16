import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fieldsets: [
    {
      name: 'homepage',
      title: '🏠 Homepage Display',
      description:
        'Content shown when this service is featured on the homepage',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'servicesPage',
      title: '📋 Services Page Display',
      description: 'How this service appears on the dedicated services page',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'colorSettings',
      title: '🎨 Color Settings',
      description: 'Customize colors for this service section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'listSection',
      title: 'List Section',
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
      fieldset: 'homepage',
      description:
        'Text to display when this service is featured on the homepage',
    },

    // Services Page Fields
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      fieldset: 'servicesPage',
      description:
        'Small uppercase label above the title (e.g., "01", "Strategy")',
    },
    {
      name: 'leadText',
      title: 'Lead Text',
      type: 'text',
      rows: 2,
      fieldset: 'servicesPage',
      description: 'Bold introductory text below the title',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'servicesPage',
      description: 'Main body text for this service',
    },
    {
      name: 'iconType',
      title: 'Image Type',
      type: 'string',
      fieldset: 'servicesPage',
      options: {
        list: [
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
      hidden: ({ parent }) => parent?.iconType === 'image',
    },
    {
      name: 'iconImage',
      title: 'Image',
      type: 'image',
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
      title: 'Image/Icon Position',
      type: 'string',
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
    },

    // Color Settings
    {
      name: 'backgroundColorType',
      title: 'Background Color',
      type: 'string',
      fieldset: 'colorSettings',
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
      name: 'backgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      fieldset: 'colorSettings',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.backgroundColorType === 'custom' ||
        parent?.backgroundColorType === 'default' ||
        !parent?.backgroundColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'backgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      fieldset: 'colorSettings',
      hidden: ({ parent }) => parent?.backgroundColorType !== 'custom',
    },
    {
      name: 'titleColorType',
      title: 'Title Color',
      type: 'string',
      fieldset: 'colorSettings',
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
      fieldset: 'colorSettings',
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
      fieldset: 'colorSettings',
      hidden: ({ parent }) => parent?.titleColorType !== 'custom',
    },
    {
      name: 'tagColor',
      title: 'Tag Text Color',
      type: 'string',
      fieldset: 'colorSettings',
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
    },
    {
      name: 'leadTextColor',
      title: 'Lead Text Color',
      type: 'string',
      fieldset: 'colorSettings',
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
    },
    {
      name: 'descriptionTextColor',
      title: 'Description Text Color',
      type: 'string',
      fieldset: 'colorSettings',
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
    },
    {
      name: 'iconColorType',
      title: 'Icon Color',
      type: 'string',
      fieldset: 'colorSettings',
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
      fieldset: 'colorSettings',
      initialValue: 0,
      hidden: ({ parent }) => parent?.iconColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconCustomColor',
      title: 'Custom Icon Color',
      type: 'simplerColor',
      fieldset: 'colorSettings',
      hidden: ({ parent }) => parent?.iconColorType !== 'custom',
    },
    {
      name: 'iconContainerColorType',
      title: 'Icon Container Background',
      type: 'string',
      fieldset: 'colorSettings',
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
      name: 'iconContainerColorShade',
      title: 'Icon Container Shade',
      type: 'number',
      fieldset: 'colorSettings',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.iconContainerColorType === 'custom' ||
        parent?.iconContainerColorType === 'default' ||
        !parent?.iconContainerColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconContainerCustomColor',
      title: 'Custom Icon Container Color',
      type: 'simplerColor',
      fieldset: 'colorSettings',
      hidden: ({ parent }) => parent?.iconContainerColorType !== 'custom',
    },

    // List Section
    {
      name: 'listStyle',
      title: 'List Style',
      type: 'string',
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
    },
    {
      name: 'listTitle',
      title: 'List Title',
      type: 'string',
      fieldset: 'listSection',
      description: 'Optional heading above the list (e.g., "Key Offerings")',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      fieldset: 'listSection',
      of: [{ type: 'string' }],
      description: 'Individual items in the list',
    },
    {
      name: 'listTextColor',
      title: 'List Text Color',
      type: 'string',
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
    },
    {
      name: 'listContainerColorType',
      title: 'List Container Background',
      type: 'string',
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
    },
    {
      name: 'listContainerColorShade',
      title: 'List Container Shade',
      type: 'number',
      fieldset: 'listSection',
      initialValue: 0,
      hidden: ({ parent }) =>
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
      fieldset: 'listSection',
      hidden: ({ parent }) => parent?.listContainerColorType !== 'custom',
    },
    {
      name: 'listIconColorType',
      title: 'List Icon/Bullet Color',
      type: 'string',
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
    },
    {
      name: 'listIconColorShade',
      title: 'List Icon Shade',
      type: 'number',
      fieldset: 'listSection',
      initialValue: 0,
      hidden: ({ parent }) => parent?.listIconColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'listIconCustomColor',
      title: 'Custom List Icon Color',
      type: 'simplerColor',
      fieldset: 'listSection',
      hidden: ({ parent }) => parent?.listIconColorType !== 'custom',
    },

    // Case Studies Section
    {
      name: 'caseStudiesSectionTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'caseStudiesSection',
      description:
        'Text above the case study buttons (e.g., "Clients that hire this service:")',
    },
    {
      name: 'featuredCaseStudies',
      title: 'Featured Case Studies',
      type: 'array',
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
