import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Singleton configuration
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes = new Set(['siteSettings', 'homepage']);

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
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Singleton - Homepage (per language)
            S.listItem()
              .title('Homepage')
              .child(
                S.list()
                  .title('Homepage by Language')
                  .items([
                    S.listItem()
                      .title('English')
                      .child(
                        S.document()
                          .schemaType('homepage')
                          .documentId('homepage-en')
                      ),
                    // Add more languages as needed
                    // S.listItem()
                    //   .title('Spanish')
                    //   .child(
                    //     S.document()
                    //       .schemaType('homepage')
                    //       .documentId('homepage-es')
                    //   ),
                  ])
              ),
            S.divider(),
            // Pages
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),
            // Services
            S.listItem()
              .title('Services')
              .child(S.documentTypeList('service').title('Services')),
            // Case Studies
            S.listItem()
              .title('Case Studies')
              .child(S.documentTypeList('caseStudy').title('Case Studies')),
            // Testimonials
            S.listItem()
              .title('Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            // Blog
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .child(
                        S.documentTypeList('blogPost').title('Blog Posts')
                      ),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('Categories')
                      .child(
                        S.documentTypeList('category').title('Categories')
                      ),
                  ])
              ),
            S.divider(),
            // Legal
            S.listItem()
              .title('Legal Pages')
              .child(S.documentTypeList('legal').title('Legal Pages')),
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
