import { defineType } from 'sanity';

export default defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type (optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
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
        {
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
        },
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as { mediaType?: string };
          if (parent?.mediaType === 'image' && !image) {
            return 'Image is required when media type is image';
          }
          return true;
        }),
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'URL to video file',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context) => {
          const parent = context.parent as { mediaType?: string };
          if (parent?.mediaType === 'video' && !video) {
            return 'Video URL is required when media type is video';
          }
          return true;
        }),
    },
    {
      name: 'videoPoster',
      title: 'Video Poster Image (optional)',
      type: 'image',
      description: 'Thumbnail shown before video plays',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
    {
      name: 'videoCaption',
      title: 'Video Caption (optional)',
      type: 'string',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      alt: 'image.alt',
      video: 'video',
    },
    prepare({ mediaType, image, alt, video }) {
      return {
        title: mediaType === 'image' ? alt || 'Image' : 'Video',
        subtitle: mediaType === 'video' ? video : undefined,
        media: image,
      };
    },
  },
});
