import { defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
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
                    { title: 'Case Studies Page', value: 'caseStudiesPage' },
                    { title: 'Contact Page', value: 'contactPage' },
                    { title: 'About Page', value: 'aboutPage' },
                    { title: 'Individual Service', value: 'service' },
                    { title: 'Individual Case Study', value: 'caseStudy' },
                    { title: 'Legal Page', value: 'legal' },
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
                name: 'serviceReference',
                title: 'Select Service',
                type: 'reference',
                to: [{ type: 'service' }],
                hidden: ({ parent }) => parent?.internalPageType !== 'service',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as {
                      internalPageType?: string;
                    };
                    if (parent?.internalPageType === 'service' && !value) {
                      return 'Please select a service';
                    }
                    return true;
                  }),
              },
              {
                name: 'caseStudyReference',
                title: 'Select Case Study',
                type: 'reference',
                to: [{ type: 'caseStudy' }],
                hidden: ({ parent }) =>
                  parent?.internalPageType !== 'caseStudy',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as {
                      internalPageType?: string;
                    };
                    if (parent?.internalPageType === 'caseStudy' && !value) {
                      return 'Please select a case study';
                    }
                    return true;
                  }),
              },
              {
                name: 'legalReference',
                title: 'Select Legal Page',
                type: 'reference',
                to: [{ type: 'legal' }],
                hidden: ({ parent }) => parent?.internalPageType !== 'legal',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as {
                      internalPageType?: string;
                    };
                    if (parent?.internalPageType === 'legal' && !value) {
                      return 'Please select a legal page';
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
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
        },
      ],
    }),
  ],
});
