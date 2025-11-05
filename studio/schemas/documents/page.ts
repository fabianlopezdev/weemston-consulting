import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    defineLanguageField(),
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      slug: 'slug.current',
    },
    prepare({ title, language, slug }) {
      return {
        title,
        subtitle: `${language.toUpperCase()} • /${slug}`,
      };
    },
  },
});
