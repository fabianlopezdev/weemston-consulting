import { defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
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
    // Internal page type selection
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
    // Reference fields for document types
    {
      name: 'serviceReference',
      title: 'Select Service',
      type: 'reference',
      to: [{ type: 'service' }],
      hidden: ({ parent }) => parent?.internalPageType !== 'service',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { internalPageType?: string };
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
      hidden: ({ parent }) => parent?.internalPageType !== 'caseStudy',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { internalPageType?: string };
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
          const parent = context.parent as { internalPageType?: string };
          if (parent?.internalPageType === 'legal' && !value) {
            return 'Please select a legal page';
          }
          return true;
        }),
    },
    // External URL field
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Must start with http:// or https://',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'external' && !value) {
            return 'External URL is required';
          }
          if (parent?.linkType === 'external' && value) {
            // Validate URL format
            const urlRule = Rule.uri({
              scheme: ['http', 'https'],
            });
            return urlRule.validate(value);
          }
          return true;
        }),
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Automatically enabled for external links',
      initialValue: ({ parent }: { parent?: { linkType?: string } }) =>
        parent?.linkType === 'external',
    },
  ],
  preview: {
    select: {
      text: 'text',
      linkType: 'linkType',
      internalPageType: 'internalPageType',
      externalUrl: 'externalUrl',
      serviceName: 'serviceReference.title',
      caseStudyName: 'caseStudyReference.title',
      legalName: 'legalReference.title',
    },
    prepare({
      text,
      linkType,
      internalPageType,
      externalUrl,
      serviceName,
      caseStudyName,
      legalName,
    }) {
      let subtitle = '';

      if (linkType === 'external') {
        subtitle = externalUrl || 'External URL';
      } else if (linkType === 'internal') {
        // Map internal page types to readable labels
        const pageTypeLabels: Record<string, string> = {
          homepage: 'Homepage',
          servicesPage: 'Services Page',
          caseStudiesPage: 'Case Studies Page',
          contactPage: 'Contact Page',
          aboutPage: 'About Page',
        };

        if (internalPageType === 'service' && serviceName) {
          subtitle = `Service: ${serviceName}`;
        } else if (internalPageType === 'caseStudy' && caseStudyName) {
          subtitle = `Case Study: ${caseStudyName}`;
        } else if (internalPageType === 'legal' && legalName) {
          subtitle = `Legal: ${legalName}`;
        } else if (internalPageType && pageTypeLabels[internalPageType]) {
          subtitle = pageTypeLabels[internalPageType];
        } else {
          subtitle = 'Internal Page';
        }
      }

      return {
        title: text,
        subtitle,
      };
    },
  },
});
