import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fieldsets: [
    {
      name: 'imageSection',
      title: '🖼️ Image & Overlay',
      description: 'Background image with overlay and project info',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'detailsSection',
      title: '📄 Details',
      description: 'Project timeline, description, and contributions',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'image', title: 'Image & Overlay' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    // Basic Info
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'content',
      description: 'The main heading (e.g., "Fyn")',
      validation: (Rule) => Rule.required().error('Client name is required'),
    },
    {
      name: 'clientColor',
      title: 'Client Name Color',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
      hidden: ({ parent }) => !parent?.client,
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      group: 'content',
      description: 'Optional logo for the client company',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the logo for screen readers',
        },
      ],
    },
    {
      name: 'logoVariant',
      title: 'Logo Color',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Dark logo', value: 'dark' },
          { title: 'Light logo', value: 'light' },
        ],
      },
      initialValue: 'dark',
      description:
        'Look at the logo you uploaded: if it appears dark/black, choose "Dark". If it appears white/light, choose "Light". This helps display the logo correctly on different backgrounds.',
    },
    { ...defineLanguageField(), group: 'content' },

    // Image Section
    {
      name: 'mainImage',
      title: 'Background Image',
      type: 'image',
      group: 'image',
      fieldset: 'imageSection',
      description:
        'Full-width background image. For best performance, use WebP format.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the image for screen readers and search engines.',
        },
        {
          name: 'seoFilename',
          title: 'Custom Image Filename',
          type: 'string',
          description:
            'Improves image SEO (e.g., "fyn-case-study" instead of "IMG_1234").',
        },
      ],
    },
    {
      name: 'overlayColorType',
      title: 'Overlay Color',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      description: 'Color for the gradient overlay on the image',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.mainImage,
    },
    {
      name: 'overlayColorShade',
      title: 'Overlay Shade',
      type: 'number',
      group: 'image',
      fieldset: 'imageSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.mainImage || parent?.overlayColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'overlayCustomColor',
      title: 'Custom Overlay Color',
      type: 'simplerColor',
      group: 'image',
      fieldset: 'imageSection',
      hidden: ({ parent }) =>
        !parent?.mainImage || parent?.overlayColorType !== 'custom',
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      group: 'image',
      fieldset: 'imageSection',
      description: 'How much of the overlay color shows (0-100)',
      initialValue: 70,
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ parent }) => !parent?.mainImage,
    },

    // Icon
    {
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      group: 'image',
      fieldset: 'imageSection',
      description: 'Search for an icon from 150,000+ available icons',
    },
    {
      name: 'iconColorType',
      title: 'Icon Color',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.icon,
    },
    {
      name: 'iconColorShade',
      title: 'Icon Shade',
      type: 'number',
      group: 'image',
      fieldset: 'imageSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.icon || parent?.iconColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconCustomColor',
      title: 'Custom Icon Color',
      type: 'simplerColor',
      group: 'image',
      fieldset: 'imageSection',
      hidden: ({ parent }) =>
        !parent?.icon || parent?.iconColorType !== 'custom',
    },
    {
      name: 'iconBgColorType',
      title: 'Icon Background Color',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => !parent?.icon,
    },
    {
      name: 'iconBgColorShade',
      title: 'Icon Background Shade',
      type: 'number',
      group: 'image',
      fieldset: 'imageSection',
      initialValue: 100,
      hidden: ({ parent }) =>
        !parent?.icon || parent?.iconBgColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconBgCustomColor',
      title: 'Custom Icon Background Color',
      type: 'simplerColor',
      group: 'image',
      fieldset: 'imageSection',
      hidden: ({ parent }) =>
        !parent?.icon || parent?.iconBgColorType !== 'custom',
    },

    // Category
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      description:
        'Uppercase category tag (e.g., "OPERATIONS", "MEETING DESIGN")',
    },
    {
      name: 'categoryColor',
      title: 'Category Color',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
      hidden: ({ parent }) => !parent?.category,
    },

    // Role
    {
      name: 'role',
      title: 'Role / Subtitle',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      description:
        'Your role or service provided (e.g., "CFO Fractional Services")',
    },
    {
      name: 'roleColor',
      title: 'Role Color',
      type: 'string',
      group: 'image',
      fieldset: 'imageSection',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Muted', value: 'muted' },
          { title: 'Contrast', value: 'contrast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contrast',
      hidden: ({ parent }) => !parent?.role,
    },

    // Details Section
    // Background Color
    {
      name: 'contentBgColorType',
      title: 'Background Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
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
      name: 'contentBgColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'details',
      fieldset: 'detailsSection',
      initialValue: 95,
      hidden: ({ parent }) =>
        parent?.contentBgColorType === 'custom' ||
        parent?.contentBgColorType === 'default' ||
        !parent?.contentBgColorType,
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'contentBgCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'details',
      fieldset: 'detailsSection',
      hidden: ({ parent }) => parent?.contentBgColorType !== 'custom',
    },

    // Date
    {
      name: 'date',
      title: 'Date / Timeline',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      description: 'Project timeline (e.g., "MARCH 2024 - PRESENT")',
    },
    {
      name: 'dateColorType',
      title: 'Date Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'secondary',
      hidden: ({ parent }) => !parent?.date,
    },
    {
      name: 'dateColorShade',
      title: 'Date Shade',
      type: 'number',
      group: 'details',
      fieldset: 'detailsSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.date || parent?.dateColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'dateCustomColor',
      title: 'Custom Date Color',
      type: 'simplerColor',
      group: 'details',
      fieldset: 'detailsSection',
      hidden: ({ parent }) =>
        !parent?.date || parent?.dateColorType !== 'custom',
    },

    // Divider
    {
      name: 'dividerColorType',
      title: 'Divider Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      description: 'Color of the line between description and contributions',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'secondary',
    },
    {
      name: 'dividerColorShade',
      title: 'Divider Shade',
      type: 'number',
      group: 'details',
      fieldset: 'detailsSection',
      initialValue: 0,
      hidden: ({ parent }) => parent?.dividerColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'dividerCustomColor',
      title: 'Custom Divider Color',
      type: 'simplerColor',
      group: 'details',
      fieldset: 'detailsSection',
      hidden: ({ parent }) => parent?.dividerColorType !== 'custom',
    },

    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'details',
      fieldset: 'detailsSection',
      description:
        'Summary explaining the project scope with rich text support',
    },
    {
      name: 'descriptionColor',
      title: 'Description Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
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
      hidden: ({ parent }) => !parent?.description,
    },

    // Contributions
    {
      name: 'contributionsTitle',
      title: 'Contributions Section Title',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      description: 'Title for the right column (e.g., "KEY CONTRIBUTIONS")',
      initialValue: 'KEY CONTRIBUTIONS',
    },
    {
      name: 'contributionsTitleColorType',
      title: 'Contributions Title Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.contributionsTitle,
    },
    {
      name: 'contributionsTitleColorShade',
      title: 'Contributions Title Shade',
      type: 'number',
      group: 'details',
      fieldset: 'detailsSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.contributionsTitle ||
        parent?.contributionsTitleColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'contributionsTitleCustomColor',
      title: 'Custom Contributions Title Color',
      type: 'simplerColor',
      group: 'details',
      fieldset: 'detailsSection',
      hidden: ({ parent }) =>
        !parent?.contributionsTitle ||
        parent?.contributionsTitleColorType !== 'custom',
    },
    {
      name: 'contributions',
      title: 'Key Contributions',
      type: 'array',
      group: 'details',
      fieldset: 'detailsSection',
      of: [{ type: 'text', rows: 2 }],
      description: 'List of specific achievements or deliverables',
    },
    {
      name: 'contributionsTextColor',
      title: 'Contributions Text Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
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
      hidden: ({ parent }) => !parent?.contributions?.length,
    },
    {
      name: 'bulletColorType',
      title: 'Bullet Color',
      type: 'string',
      group: 'details',
      fieldset: 'detailsSection',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
      hidden: ({ parent }) => !parent?.contributions?.length,
    },
    {
      name: 'bulletColorShade',
      title: 'Bullet Shade',
      type: 'number',
      group: 'details',
      fieldset: 'detailsSection',
      initialValue: 0,
      hidden: ({ parent }) =>
        !parent?.contributions?.length || parent?.bulletColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'bulletCustomColor',
      title: 'Custom Bullet Color',
      type: 'simplerColor',
      group: 'details',
      fieldset: 'detailsSection',
      hidden: ({ parent }) =>
        !parent?.contributions?.length || parent?.bulletColorType !== 'custom',
    },

    // Related Service
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      group: 'content',
      to: [{ type: 'service' }],
      description: 'Link this case study to a service',
    },
  ],
  orderings: [
    {
      title: 'Client Name',
      name: 'clientAsc',
      by: [{ field: 'client', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'category',
      language: 'language',
      media: 'mainImage',
    },
    prepare({ title, subtitle, language, media }) {
      return {
        title: title || 'New Case Study',
        subtitle: [subtitle, language?.toUpperCase()]
          .filter(Boolean)
          .join(' • '),
        media,
      };
    },
  },
});
