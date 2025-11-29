import { defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaDescription',
      title: 'Search Results Description (optional)',
      type: 'text',
      rows: 3,
      description:
        "The short preview text that appears under your title in Google search results. This is your chance to convince people to click on your page! Write a clear, enticing summary of what they'll find on this page. Keep it under 160 characters. **If left empty:** Search engines will extract random text from your page, which may not be ideal.",
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Social Media Preview Image (optional)',
      type: 'image',
      description:
        'The image that appears when someone shares this page on Facebook, LinkedIn, Twitter, or other social media. This makes your shared links look professional and engaging. Recommended size: 1200×630 pixels. **If left empty:** Links will be shared without a preview image.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines (optional)',
      type: 'boolean',
      description:
        'Turn this ON to prevent Google and other search engines from showing this page in search results. Useful for pages that are work-in-progress, private, or not ready for public viewing. Leave OFF for pages you want people to find through search. **Default:** OFF (page is visible in search results).',
      initialValue: false,
    },
  ],
});
