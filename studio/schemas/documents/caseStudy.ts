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
      name: 'imageColors',
      title: '🎨 Image Section Colors',
      description: 'Customize colors for the image overlay area',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'detailsSection',
      title: '📄 Details',
      description: 'Project timeline, description, and contributions',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'detailsColors',
      title: '🎨 Details Section Colors',
      description: 'Customize colors for the details area',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Basic Info
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'The main heading (e.g., "Fyn")',
    },
    defineLanguageField(),

    // Image Section
    {
      name: 'mainImage',
      title: 'Background Image',
      type: 'image',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      fieldset: 'imageSection',
      description: 'Icon displayed in the image overlay',
      options: {
        list: [
          { title: 'Globe', value: 'globe' },
          { title: 'Layers', value: 'layers' },
          { title: 'Settings (Gear)', value: 'settings' },
          { title: 'Target', value: 'target' },
          { title: 'Users (Team)', value: 'users' },
          { title: 'Chart (Analytics)', value: 'chart' },
          { title: 'Lightbulb (Ideas)', value: 'lightbulb' },
          { title: 'Handshake', value: 'handshake' },
          { title: 'Compass', value: 'compass' },
          { title: 'Calendar', value: 'calendar' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'Briefcase', value: 'briefcase' },
          { title: 'Building', value: 'building' },
          { title: 'Code', value: 'code' },
          { title: 'Pencil', value: 'pencil' },
        ],
      },
      initialValue: 'globe',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'imageSection',
      description:
        'Uppercase category tag (e.g., "OPERATIONS", "MEETING DESIGN")',
    },
    {
      name: 'role',
      title: 'Role / Subtitle',
      type: 'string',
      fieldset: 'imageSection',
      description:
        'Your role or service provided (e.g., "CFO Fractional Services")',
    },

    // Image Section Colors
    {
      name: 'overlayColorType',
      title: 'Overlay Color',
      type: 'string',
      fieldset: 'imageColors',
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
    },
    {
      name: 'overlayColorShade',
      title: 'Overlay Shade',
      type: 'number',
      fieldset: 'imageColors',
      initialValue: 0,
      hidden: ({ parent }) => parent?.overlayColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'overlayCustomColor',
      title: 'Custom Overlay Color',
      type: 'simplerColor',
      fieldset: 'imageColors',
      hidden: ({ parent }) => parent?.overlayColorType !== 'custom',
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      fieldset: 'imageColors',
      description: 'How much of the overlay color shows (0-100)',
      initialValue: 70,
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: 'iconBgColorType',
      title: 'Icon Background Color',
      type: 'string',
      fieldset: 'imageColors',
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
      name: 'iconBgColorShade',
      title: 'Icon Background Shade',
      type: 'number',
      fieldset: 'imageColors',
      initialValue: 100,
      hidden: ({ parent }) => parent?.iconBgColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'iconBgCustomColor',
      title: 'Custom Icon Background Color',
      type: 'simplerColor',
      fieldset: 'imageColors',
      hidden: ({ parent }) => parent?.iconBgColorType !== 'custom',
    },
    {
      name: 'iconColorType',
      title: 'Icon Color',
      type: 'string',
      fieldset: 'imageColors',
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
      fieldset: 'imageColors',
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
      fieldset: 'imageColors',
      hidden: ({ parent }) => parent?.iconColorType !== 'custom',
    },
    {
      name: 'categoryColor',
      title: 'Category Text Color',
      type: 'string',
      fieldset: 'imageColors',
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
    },
    {
      name: 'clientColor',
      title: 'Client Name Color',
      type: 'string',
      fieldset: 'imageColors',
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
    },
    {
      name: 'roleColor',
      title: 'Role Text Color',
      type: 'string',
      fieldset: 'imageColors',
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
    },

    // Details Section
    {
      name: 'date',
      title: 'Date / Timeline',
      type: 'string',
      fieldset: 'detailsSection',
      description: 'Project timeline (e.g., "MARCH 2024 - PRESENT")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'detailsSection',
      description: 'Summary paragraph explaining the project scope',
    },
    {
      name: 'contributionsTitle',
      title: 'Contributions Section Title',
      type: 'string',
      fieldset: 'detailsSection',
      description: 'Title for the right column (e.g., "KEY CONTRIBUTIONS")',
      initialValue: 'KEY CONTRIBUTIONS',
    },
    {
      name: 'contributions',
      title: 'Key Contributions',
      type: 'array',
      fieldset: 'detailsSection',
      of: [{ type: 'string' }],
      description: 'List of specific achievements or deliverables',
    },

    // Details Section Colors
    {
      name: 'contentBgColorType',
      title: 'Background Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      fieldset: 'detailsColors',
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
      fieldset: 'detailsColors',
      hidden: ({ parent }) => parent?.contentBgColorType !== 'custom',
    },
    {
      name: 'dateColor',
      title: 'Date Text Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      name: 'descriptionColor',
      title: 'Description Text Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      name: 'contributionsTitleColorType',
      title: 'Contributions Title Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      name: 'contributionsTitleColorShade',
      title: 'Contributions Title Shade',
      type: 'number',
      fieldset: 'detailsColors',
      initialValue: 0,
      hidden: ({ parent }) => parent?.contributionsTitleColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'contributionsTitleCustomColor',
      title: 'Custom Contributions Title Color',
      type: 'simplerColor',
      fieldset: 'detailsColors',
      hidden: ({ parent }) => parent?.contributionsTitleColorType !== 'custom',
    },
    {
      name: 'contributionsTextColor',
      title: 'Contributions Text Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      name: 'bulletColorType',
      title: 'Bullet Color',
      type: 'string',
      fieldset: 'detailsColors',
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
      name: 'bulletColorShade',
      title: 'Bullet Shade',
      type: 'number',
      fieldset: 'detailsColors',
      initialValue: 0,
      hidden: ({ parent }) => parent?.bulletColorType === 'custom',
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'bulletCustomColor',
      title: 'Custom Bullet Color',
      type: 'simplerColor',
      fieldset: 'detailsColors',
      hidden: ({ parent }) => parent?.bulletColorType !== 'custom',
    },

    // Related Service
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
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
        title,
        subtitle: [subtitle, language?.toUpperCase()]
          .filter(Boolean)
          .join(' • '),
        media,
      };
    },
  },
});
