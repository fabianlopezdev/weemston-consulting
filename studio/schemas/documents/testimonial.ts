import { defineType } from 'sanity';
import { supportedLanguages, baseLanguage } from '../../lib/i18n';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Job title or role',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company or organization name',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The testimonial text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Photo of the person',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Required for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: supportedLanguages.map((lang) => ({
          title: lang.title,
          value: lang.id,
        })),
      },
      initialValue: baseLanguage?.id,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured to easily filter testimonials',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      company: 'company',
      language: 'language',
      media: 'avatar',
    },
    prepare({ name, position, company, language, media }) {
      const subtitle = company ? `${position} at ${company}` : position;
      return {
        title: name,
        subtitle: `${subtitle} • ${language.toUpperCase()}`,
        media,
      };
    },
  },
});
