import { defineType, defineArrayMember } from 'sanity';

/**
 * Team Member Bio — PortableText config for a team member's biography.
 *
 * Intentionally narrower than the shared `portableText` type:
 *   - No headings or lists (a bio is one continuous narrative)
 *   - Italic + bold + links as inline marks
 *   - The custom `pullQuote` block can be inserted inline between paragraphs
 *
 * The frontend renders pullQuote blocks as a centered italic Lora callout.
 */
export default defineType({
  name: 'teamMemberBio',
  title: 'Team Member Bio',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Bold', value: 'strong' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'linkType',
                title: 'Linked to',
                type: 'string',
                options: {
                  list: [
                    { title: 'Internal Page', value: 'internal' },
                    { title: 'External URL', value: 'external' },
                  ],
                  layout: 'radio',
                },
                initialValue: 'internal',
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'internalPageType',
                title: 'Page Type',
                type: 'string',
                options: {
                  list: [
                    { title: 'Homepage', value: 'homepage' },
                    { title: 'Services Page', value: 'servicesPage' },
                    {
                      title: 'Case Studies Page',
                      value: 'caseStudiesPage',
                    },
                    { title: 'Contact Page', value: 'contactPage' },
                    { title: 'The Journey', value: 'aboutPage' },
                    { title: 'Our Team', value: 'teamPage' },
                    { title: 'Our Approach', value: 'approachPage' },
                  ],
                },
                hidden: ({ parent }) => parent?.linkType !== 'internal',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as { linkType?: string };
                    if (parent?.linkType === 'internal' && !value) {
                      return 'Page type is required for internal links';
                    }
                    return true;
                  }),
              },
              {
                name: 'externalUrl',
                title: 'External URL',
                type: 'url',
                description: 'Must start with http:// or https://',
                hidden: ({ parent }) => parent?.linkType !== 'external',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https'],
                  }).custom((value, context) => {
                    const parent = context.parent as { linkType?: string };
                    if (parent?.linkType === 'external' && !value) {
                      return 'External URL is required';
                    }
                    return true;
                  }),
              },
              {
                name: 'openInNewTab',
                title: 'Open in New Tab',
                type: 'boolean',
                description: 'Automatically enabled for external links',
                initialValue: ({
                  parent,
                }: {
                  parent?: { linkType?: string };
                }) => parent?.linkType === 'external',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'pullQuote' }),
  ],
});
