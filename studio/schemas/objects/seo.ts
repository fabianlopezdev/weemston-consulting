import { defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Search Results Title',
      type: 'string',
      description:
        'The title that appears in Google search results and browser tabs. Make it compelling and include important keywords. If left empty, the page title will be used. Keep it under 60 characters so it displays fully in search results.',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters'),
    },
    {
      name: 'metaDescription',
      title: 'Search Results Description',
      type: 'text',
      rows: 3,
      description:
        "The short preview text that appears under your title in Google search results. This is your chance to convince people to click on your page! Write a clear, enticing summary of what they'll find on this page. Keep it under 160 characters.",
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Social Media Preview Image',
      type: 'image',
      description:
        'The image that appears when someone shares this page on Facebook, LinkedIn, Twitter, or other social media. This makes your shared links look professional and engaging. Recommended size: 1200×630 pixels.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description:
        'Turn this ON to prevent Google and other search engines from showing this page in search results. Useful for pages that are work-in-progress, private, or not ready for public viewing. Leave OFF for pages you want people to find through search.',
      initialValue: false,
    },
  ],
});
