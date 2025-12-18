import { defineType } from 'sanity';
import { defineLanguageField } from '../../lib/i18n';
import { BackgroundShadeInput } from '../../components/BackgroundShadeInput';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Search Results Description (optional)',
      description:
        'If left empty, search engines will extract the description from page content.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'ogImage',
      title: 'Social Media Preview Image (optional)',
      description:
        'Also called OG Image. The image shown when this page is shared on social media. If left empty, social media platforms may show no preview image or extract one from the page.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'leftPanelFields',
      title: '⬅️ Left Panel (Info)',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'rightPanelFields',
      title: '➡️ Right Panel (Form)',
      options: { collapsible: true, collapsed: false },
    },
  ],
  groups: [
    { name: 'leftPanel', title: 'Left Panel' },
    { name: 'rightPanel', title: 'Right Panel' },
  ],
  fields: [
    // SEO Fields
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used as the SEO title in search results.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Contact',
    },
    {
      name: 'metaDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description:
        'The short preview text that appears under your title in Google search results. Keep it under 160 characters.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Image',
      type: 'image',
      fieldset: 'ogImage',
      description: 'Recommended size: 1200×630 pixels.',
      options: { hotspot: true },
    },
    defineLanguageField(),

    // === LEFT PANEL (Info Side) ===
    // Background Color
    {
      name: 'leftBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'secondary',
    },
    {
      name: 'leftBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.leftBackgroundColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'leftBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.leftBackgroundColorType !== 'custom',
    },

    // Heading
    {
      name: 'leftHeading',
      title: 'Heading',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: "Let's start a conversation.",
    },
    {
      name: 'leftHeadingColorType',
      title: 'Heading Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'leftHeadingColorShade',
      title: 'Heading Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.leftHeadingColorType === 'custom' ||
        parent?.leftHeadingColorType === 'white',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'leftHeadingCustomColor',
      title: 'Custom Heading Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.leftHeadingColorType !== 'custom',
    },

    // Description
    {
      name: 'leftDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue:
        "Whether you're exploring operational support, strategic project leadership, or help designing an impactful convening, we'd love to hear from you.",
    },
    {
      name: 'leftDescriptionColorType',
      title: 'Description Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Muted (Light Gray)', value: 'muted' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'muted',
    },
    {
      name: 'leftDescriptionColorShade',
      title: 'Description Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.leftDescriptionColorType === 'custom' ||
        parent?.leftDescriptionColorType === 'white' ||
        parent?.leftDescriptionColorType === 'muted',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'leftDescriptionCustomColor',
      title: 'Custom Description Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.leftDescriptionColorType !== 'custom',
    },

    // Quote
    {
      name: 'leftQuote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue:
        'At Weemston Consulting, every collaboration begins with curiosity, understanding your goals, your challenges, and where you want to go next.',
    },
    {
      name: 'leftQuoteColorType',
      title: 'Quote Text Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Muted (Light Gray)', value: 'muted' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'muted',
    },
    {
      name: 'leftQuoteColorShade',
      title: 'Quote Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.leftQuoteColorType === 'custom' ||
        parent?.leftQuoteColorType === 'white' ||
        parent?.leftQuoteColorType === 'muted',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'leftQuoteCustomColor',
      title: 'Custom Quote Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.leftQuoteColorType !== 'custom',
    },
    {
      name: 'leftQuoteBorderColorType',
      title: 'Quote Border Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'leftQuoteBorderColorShade',
      title: 'Quote Border Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.leftQuoteBorderColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'leftQuoteBorderCustomColor',
      title: 'Custom Quote Border Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.leftQuoteBorderColorType !== 'custom',
    },

    // Email
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 'hello@weemston.com',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'emailLinkColorType',
      title: 'Email Link Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'emailLinkColorShade',
      title: 'Email Link Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.emailLinkColorType === 'custom' ||
        parent?.emailLinkColorType === 'white',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'emailLinkCustomColor',
      title: 'Custom Email Link Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.emailLinkColorType !== 'custom',
    },
    {
      name: 'emailHoverColorType',
      title: 'Email Hover Color',
      type: 'string',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'emailHoverColorShade',
      title: 'Email Hover Shade',
      type: 'number',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.emailHoverColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'emailHoverCustomColor',
      title: 'Custom Email Hover Color',
      type: 'simplerColor',
      group: 'leftPanel',
      fieldset: 'leftPanelFields',
      hidden: ({ parent }) => parent?.emailHoverColorType !== 'custom',
    },

    // === RIGHT PANEL (Form Side) ===
    // Background Color
    {
      name: 'rightBackgroundColorType',
      title: 'Background Color',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'rightBackgroundColorShade',
      title: 'Background Shade',
      type: 'number',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.rightBackgroundColorType === 'custom' ||
        parent?.rightBackgroundColorType === 'white',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'rightBackgroundCustomColor',
      title: 'Custom Background Color',
      type: 'simplerColor',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      hidden: ({ parent }) => parent?.rightBackgroundColorType !== 'custom',
    },

    // Form Field: Name
    {
      name: 'formNameLabel',
      title: 'Name Field Label',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'Name',
    },
    {
      name: 'formNamePlaceholder',
      title: 'Name Field Placeholder',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'Jane Doe',
    },

    // Form Field: Email
    {
      name: 'formEmailLabel',
      title: 'Email Field Label',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'Email',
    },
    {
      name: 'formEmailPlaceholder',
      title: 'Email Field Placeholder',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'jane@company.com',
    },

    // Form Field: Message
    {
      name: 'formMessageLabel',
      title: 'Message Field Label',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'What challenge are you navigating?',
    },
    {
      name: 'formMessagePlaceholder',
      title: 'Message Field Placeholder',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'Tell us a bit about your organization...',
    },

    // Form Label Color
    {
      name: 'formLabelColorType',
      title: 'Form Label Color',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      options: {
        list: [
          { title: 'Dark (Default)', value: 'dark' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'dark',
    },
    {
      name: 'formLabelColorShade',
      title: 'Form Label Shade',
      type: 'number',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.formLabelColorType === 'custom' ||
        parent?.formLabelColorType === 'dark',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'formLabelCustomColor',
      title: 'Custom Form Label Color',
      type: 'simplerColor',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      hidden: ({ parent }) => parent?.formLabelColorType !== 'custom',
    },

    // Submit Button
    {
      name: 'formSubmitText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 'Send Message',
    },
    {
      name: 'formSubmitButtonColor',
      title: 'Submit Button Color',
      type: 'buttonColor',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
    },

    // Input Focus Ring Color
    {
      name: 'formFocusColorType',
      title: 'Input Focus Ring Color',
      type: 'string',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'accent',
    },
    {
      name: 'formFocusColorShade',
      title: 'Input Focus Shade',
      type: 'number',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      initialValue: 0,
      hidden: ({ parent }) => parent?.formFocusColorType === 'custom',
      validation: (Rule) => Rule.min(0).max(100).integer(),
      components: {
        input: BackgroundShadeInput,
      },
    },
    {
      name: 'formFocusCustomColor',
      title: 'Custom Focus Color',
      type: 'simplerColor',
      group: 'rightPanel',
      fieldset: 'rightPanelFields',
      hidden: ({ parent }) => parent?.formFocusColorType !== 'custom',
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'Contact Page',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
