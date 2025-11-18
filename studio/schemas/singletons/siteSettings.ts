import { defineType } from 'sanity';
import { createI18nField } from '../../lib/i18n';

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
          name: 'logo',
          title: 'Logo (optional)',
          type: 'image',
          description:
            'Upload your logo image. Used when "Logo Only" or "Logo + Site Title" is selected above. If logo is missing and "Logo Only" is selected, site title will be shown as fallback.',
          options: {
            hotspot: true,
          },
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
          type: 'string',
          description: 'Hex color code',
        },
        {
          name: 'secondary',
          title: 'Secondary Color (optional)',
          type: 'string',
        },
        {
          name: 'accent',
          title: 'Accent Color (optional)',
          type: 'string',
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Links (optional)',
      type: 'array',
      of: [{ type: 'link' }],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Footer Text (optional)',
          ...createI18nField('text', { rows: 2 }),
        },
        {
          name: 'links',
          title: 'Footer Links (optional)',
          type: 'array',
          of: [{ type: 'link' }],
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
    {
      name: 'analyticsEnabled',
      title: 'Enable Analytics (optional)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'analyticsId',
      title: 'Analytics ID (optional)',
      type: 'string',
      hidden: ({ document }) => !document?.analyticsEnabled,
    },
    {
      name: 'cookieConsentEnabled',
      title: 'Enable Cookie Consent (optional)',
      type: 'boolean',
      initialValue: true,
      description: 'Required for EU/EEA/UK visitors',
    },
    {
      name: 'redirects',
      title: 'URL Redirects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'from',
              title: 'From Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'to',
              title: 'To Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'permanent',
              title: 'Permanent (301) (optional)',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              from: 'from',
              to: 'to',
              permanent: 'permanent',
            },
            prepare({ from, to, permanent }) {
              return {
                title: `${from} → ${to}`,
                subtitle: permanent ? '301 Permanent' : '302 Temporary',
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
