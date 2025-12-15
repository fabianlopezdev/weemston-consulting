import { defineType } from 'sanity';

export default defineType({
  name: 'serviceSection',
  title: 'Service Section',
  type: 'object',
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'list',
      title: 'List Items',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'styling',
      title: 'Styling',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Content fields
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      fieldset: 'content',
      description:
        'Small uppercase label above the title (e.g., "Transformation", "Execution")',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      description: 'Main heading for this service',
    },
    {
      name: 'leadText',
      title: 'Lead Text',
      type: 'text',
      rows: 2,
      fieldset: 'content',
      description: 'Larger intro paragraph displayed prominently',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'content',
      description: 'Body paragraph explaining the service',
    },

    // List items
    {
      name: 'listStyle',
      title: 'List Style',
      type: 'string',
      fieldset: 'list',
      options: {
        list: [
          { title: 'Checkmark', value: 'checkmark' },
          { title: 'Arrow', value: 'arrow' },
          { title: 'Bullet', value: 'bullet' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'checkmark',
    },
    {
      name: 'listTitle',
      title: 'List Title (optional)',
      type: 'string',
      fieldset: 'list',
      description:
        'Optional heading above the list (e.g., "Our approach includes:")',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      fieldset: 'list',
      of: [{ type: 'string' }],
      description: 'Benefit or feature items to display',
    },

    // Case studies link
    {
      name: 'caseStudiesLinkText',
      title: 'Case Studies Link Text',
      type: 'string',
      description:
        'Text for the case studies link (e.g., "See Case Studies: Fyn, Nonstop Enterprises")',
    },
    {
      name: 'caseStudiesLink',
      title: 'Case Studies Link',
      type: 'link',
      description: 'Link to related case studies',
    },

    // Icon/visual placeholder
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      fieldset: 'styling',
      description: 'Icon displayed in the image placeholder area',
      options: {
        list: [
          { title: 'Settings (Gear)', value: 'settings' },
          { title: 'Target (Goal)', value: 'target' },
          { title: 'Users (People)', value: 'users' },
          { title: 'Chart (Growth)', value: 'chart' },
          { title: 'Lightbulb (Idea)', value: 'lightbulb' },
          { title: 'Handshake (Partnership)', value: 'handshake' },
          { title: 'Compass (Direction)', value: 'compass' },
          { title: 'Calendar (Events)', value: 'calendar' },
          { title: 'Presentation', value: 'presentation' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'settings',
    },

    // Layout options
    {
      name: 'imagePosition',
      title: 'Image/Icon Position',
      type: 'string',
      fieldset: 'styling',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
      description: 'Position of the image/icon placeholder relative to content',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      fieldset: 'styling',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Cream (Light)', value: 'cream' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'white',
    },
  ],
  preview: {
    select: {
      title: 'title',
      tag: 'tag',
    },
    prepare({ title, tag }) {
      return {
        title: title || 'Untitled Service',
        subtitle: tag || 'No tag',
      };
    },
  },
});
