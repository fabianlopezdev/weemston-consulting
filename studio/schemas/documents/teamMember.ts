import { defineType } from 'sanity';
import { HiUser } from 'react-icons/hi';
import { defineLanguageField } from '../../lib/i18n';

/**
 * Team Member — an individually-managed document representing one person
 * on the Weemston Consulting team. Editors can add/edit/reorder members
 * from the "Team Members" list in the studio sidebar.
 *
 * The frontend's /our-team page queries all team members ordered by `order`
 * (ascending) and alternates layout/tone automatically based on position.
 */
export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: HiUser,
  fieldsets: [
    {
      name: 'meta',
      title: 'Order & language',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., "Jennifer L. Scully, Ed.D."',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameAccent',
      title: 'Italicized portion of name (optional)',
      type: 'string',
      description:
        'Substring of the full name to render in italics, mirroring the hero\'s "Our Team" treatment. Leave blank for no italic. Example: "Scully" italicizes "Scully" within "Jennifer L. Scully, Ed.D."',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value) return true;
          const parent = context.parent as { name?: string };
          if (parent?.name && !parent.name.includes(value)) {
            return 'Accent must be a substring of the full name';
          }
          return true;
        }),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description:
        'e.g., "Office Manager". Shown as a small uppercase eyebrow above the name.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      fieldsets: [
        {
          name: 'seoFilename',
          title: 'SEO Filename (optional)',
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the image for screen readers and search engines. Be specific — e.g. "Jennifer L. Scully, Office Manager at Weemston Consulting".',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seoFilename',
          title: 'Custom Filename',
          type: 'string',
          description:
            'Improves image SEO with a descriptive filename. Use lowercase with hyphens (e.g., "jennifer-scully-headshot").',
          fieldset: 'seoFilename',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'teamMemberBio',
      description:
        'The biography. Use the "Pull Quote" block (from the insert menu next to Italic/Bold) to drop a centered editorial callout between paragraphs.',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Lower numbers appear first. Use 10, 20, 30… so you can insert new members between existing ones without renumbering.',
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
      fieldset: 'meta',
    },
    { ...defineLanguageField(), fieldset: 'meta' },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      order: 'order',
      language: 'language',
    },
    prepare({ title, subtitle, media, order, language }) {
      const orderTag = order != null ? ` · #${order}` : '';
      const langTag =
        typeof language === 'string' ? ` · ${language.toUpperCase()}` : '';
      return {
        title: title || 'Untitled team member',
        subtitle: `${subtitle || ''}${orderTag}${langTag}`.trim() || undefined,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest first',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
});
