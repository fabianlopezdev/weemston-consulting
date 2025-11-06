import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { supportedLanguages, baseLanguage, isMultiLanguage } from './lib/i18n';
import {
  HiCog,
  HiHome,
  HiCollection,
  HiChartBar,
  HiDocumentText,
  HiMail,
  HiInformationCircle,
  HiClipboardList,
  HiBriefcase,
  HiTrendingUp,
  HiChatAlt,
  HiNewspaper,
  HiDocument,
  HiUser,
  HiTag,
} from 'react-icons/hi';

// Singleton configuration
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes = new Set([
  'siteSettings',
  'homepage',
  'servicesPage',
  'caseStudiesPage',
  'blogPage',
  'contactPage',
  'aboutPage',
]);

export default defineConfig({
  name: 'default',
  title: 'Website Boilerplate',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton - Site Settings
            S.listItem()
              .title('Site Settings')
              .icon(HiCog)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Homepage
            S.listItem()
              .title('Homepage')
              .icon(HiHome)
              .id('homepage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('Homepage by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('homepage')
                                .documentId(`homepage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('homepage')
                      .documentId(`homepage-${baseLanguage?.id || 'en'}`)
              ),
            // Services Page
            S.listItem()
              .title('Services Page')
              .icon(HiCollection)
              .id('servicesPage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('Services Page by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('servicesPage')
                                .documentId(`servicesPage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('servicesPage')
                      .documentId(`servicesPage-${baseLanguage?.id || 'en'}`)
              ),
            // Case Studies Page
            S.listItem()
              .title('Case Studies Page')
              .icon(HiChartBar)
              .id('caseStudiesPage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('Case Studies Page by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('caseStudiesPage')
                                .documentId(`caseStudiesPage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('caseStudiesPage')
                      .documentId(`caseStudiesPage-${baseLanguage?.id || 'en'}`)
              ),
            // Blog Page
            S.listItem()
              .title('Blog Page')
              .icon(HiDocumentText)
              .id('blogPage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('Blog Page by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('blogPage')
                                .documentId(`blogPage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('blogPage')
                      .documentId(`blogPage-${baseLanguage?.id || 'en'}`)
              ),
            // Contact Page
            S.listItem()
              .title('Contact Page')
              .icon(HiMail)
              .id('contactPage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('Contact Page by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('contactPage')
                                .documentId(`contactPage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('contactPage')
                      .documentId(`contactPage-${baseLanguage?.id || 'en'}`)
              ),
            // About Page
            S.listItem()
              .title('About Page')
              .icon(HiInformationCircle)
              .id('aboutPage-singleton')
              .child(
                isMultiLanguage
                  ? S.list()
                      .title('About Page by Language')
                      .items(
                        supportedLanguages.map((lang) =>
                          S.listItem()
                            .title(lang.title)
                            .child(
                              S.document()
                                .schemaType('aboutPage')
                                .documentId(`aboutPage-${lang.id}`)
                            )
                        )
                      )
                  : S.document()
                      .schemaType('aboutPage')
                      .documentId(`aboutPage-${baseLanguage?.id || 'en'}`)
              ),
            // Legal Pages
            S.listItem()
              .title('Legal Pages')
              .icon(HiClipboardList)
              .child(S.documentTypeList('legal').title('Legal Pages')),
            S.divider(),
            // Services
            S.listItem()
              .title('Services')
              .icon(HiBriefcase)
              .child(S.documentTypeList('service').title('Services')),
            // Case Studies
            S.listItem()
              .title('Case Studies')
              .icon(HiTrendingUp)
              .child(S.documentTypeList('caseStudy').title('Case Studies')),
            // Testimonials
            S.listItem()
              .title('Testimonials')
              .icon(HiChatAlt)
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            // Blog
            S.listItem()
              .title('Blog')
              .icon(HiNewspaper)
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .icon(HiDocument)
                      .child(
                        S.documentTypeList('blogPost').title('Blog Posts')
                      ),
                    S.listItem()
                      .title('Authors')
                      .icon(HiUser)
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('Categories')
                      .icon(HiTag)
                      .child(
                        S.documentTypeList('category').title('Categories')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from "Create new" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filter out actions that shouldn't be available for singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
