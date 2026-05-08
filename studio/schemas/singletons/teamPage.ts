import { defineType } from 'sanity';

/**
 * Our Team Page — singleton holding the page-level fields (SEO + hero).
 * Team members themselves are separate `teamMember` documents queried
 * alongside this singleton.
 */
export default defineType({
  name: 'teamPage',
  title: 'Our Team Page',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Search Results',
      description:
        'Title, description, and image used by search engines and social shares.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'hero',
      title: 'Hero',
      description:
        'The top of the Our Team page. The visual treatment (cream bg, gray italic divider) matches the rest of the internal pages automatically.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Used as the browser tab title and SEO fallback. Example: "Our Team | Weemston Consulting".',
      validation: (Rule) => Rule.required(),
      fieldset: 'seo',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Up to 160 characters. Shown in search results.',
      validation: (Rule) => Rule.max(160),
      fieldset: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
      fieldset: 'seo',
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'e.g., "Our Team"',
      validation: (Rule) => Rule.required(),
      fieldset: 'hero',
    },
    {
      name: 'heroHeadingHighlight',
      title: 'Italicized Word in Heading (optional)',
      type: 'string',
      description:
        'Substring of the heading to italicize and render in light gray. e.g. "Team" inside "Our Team".',
      fieldset: 'hero',
    },
    {
      name: 'heroTagline',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'e.g., "The people behind Weemston Consulting"',
      fieldset: 'hero',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Our Team Page' };
    },
  },
});
