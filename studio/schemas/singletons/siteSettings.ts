import { defineType } from 'sanity';
import { ButtonStyleInput } from '../../components/ButtonStyleInput';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description:
        'The name of your website used for site-wide branding (header, footer, and fallbacks). Note: Each page has its own SEO fields (Search Results Title) for search engine optimization.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description:
        'The small icon that appears in browser tabs, bookmarks, and browser history next to your site name. This helps visitors easily identify your site among multiple open tabs. Recommended: Square image (512×512px or larger). Supported formats: PNG, SVG, or WebP. Best choice: SVG for scalability, PNG for broad compatibility.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'object',
      description:
        'Upload your logo images. If no logo is provided, the Site Title will be displayed as text instead.',
      fields: [
        {
          name: 'variant1',
          title: 'Logo Variant 1',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'variant2',
          title: 'Logo Variant 2 (optional)',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        {
          name: 'displayMode',
          title: 'Header Display',
          type: 'string',
          description:
            'Choose what to display in the header at the top-left of your site.',
          options: {
            list: [
              {
                title: 'Logo Only',
                value: 'logo',
              },
              {
                title: 'Logo + Site Title',
                value: 'both',
              },
              {
                title: 'Site Title Only',
                value: 'text',
              },
            ],
          },
          initialValue: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'logoVariant',
          title: 'Logo to Display',
          type: 'string',
          description:
            'Choose which logo variant to show in the header. Configure logo variants in the Logos section above.',
          options: {
            list: [
              { title: 'Variant 1', value: 'variant1' },
              { title: 'Variant 2', value: 'variant2' },
            ],
          },
          hidden: ({ parent }) => parent?.displayMode === 'text',
        },
      ],
    },
    {
      name: 'colors',
      title: 'Brand Colors',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color (optional)',
          type: 'simplerColor',
        },
        {
          name: 'secondary',
          title: 'Secondary Color (optional)',
          type: 'simplerColor',
        },
        {
          name: 'accent',
          title: 'Accent Color (optional)',
          type: 'simplerColor',
        },
      ],
    },
    {
      name: 'buttonStyles',
      title: 'Button Styles',
      type: 'object',
      description: 'Customize the appearance of buttons across your site',
      initialValue: {
        borderRadius: 4,
        verticalPadding: 12,
        horizontalPadding: 24,
      },
      components: {
        input: ButtonStyleInput,
      },
      fields: [
        {
          name: 'borderRadius',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(50).integer(),
        },
        {
          name: 'verticalPadding',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(40).integer(),
        },
        {
          name: 'horizontalPadding',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(60).integer(),
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Links (optional)',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'logoVariant',
          title: 'Logo to Display (optional)',
          type: 'string',
          description:
            'Choose which logo variant to show in the footer. Leave empty for no logo.',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Variant 1', value: 'variant1' },
              { title: 'Variant 2', value: 'variant2' },
            ],
          },
          initialValue: 'none',
        },
        {
          name: 'links',
          title: 'Footer Links (optional)',
          type: 'array',
          of: [{ type: 'navigationLink' }],
        },
      ],
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform (optional)',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL (optional)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
