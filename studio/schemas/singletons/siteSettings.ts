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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'colors',
      title: 'Brand Colors',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code',
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'string',
        },
        {
          name: 'accent',
          title: 'Accent Color',
          type: 'string',
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Links',
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
          title: 'Footer Text',
          ...createI18nField('text', { rows: 2 }),
        },
        {
          name: 'links',
          title: 'Footer Links',
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
              title: 'Platform',
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
              title: 'URL',
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
      title: 'Enable Analytics',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'analyticsId',
      title: 'Analytics ID',
      type: 'string',
      hidden: ({ document }) => !document?.analyticsEnabled,
    },
    {
      name: 'cookieConsentEnabled',
      title: 'Enable Cookie Consent',
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
              title: 'Permanent (301)',
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
