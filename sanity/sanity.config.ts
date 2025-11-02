import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

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
  },
});
