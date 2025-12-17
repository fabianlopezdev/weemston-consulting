import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { iconify } from 'sanity-plugin-iconify';
import { schemaTypes } from './schemas';
import './styles/studio.css';
import { supportedLanguages, baseLanguage, isMultiLanguage } from './lib/i18n';
import {
  HiCog,
  HiHome,
  HiCollection,
  HiChartBar,
  HiMail,
  HiInformationCircle,
  HiClipboardList,
  HiBriefcase,
  HiTrendingUp,
  HiChatAlt,
  HiLightBulb,
} from 'react-icons/hi';
import { DocumentListWithBanner } from './components/DocumentListWithBanner';

// Singleton configuration
const singletonTypes = new Set([
  'siteSettings',
  'homepage',
  'servicesPage',
  'caseStudiesPage',
  'contactPage',
  'aboutPage',
  'approachPage',
]);

export default defineConfig({
  name: 'default',
  title: 'Weemston Consulting',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    simplerColorInput({
      defaultColorFormat: 'hex',
    }),
    iconify({
      collections: ['heroicons', 'lucide', 'fa'],
    }),
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
                S.document()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
              ),
            // Case Studies Page
            S.listItem()
              .title('Case Studies Page')
              .icon(HiChartBar)
              .id('caseStudiesPage-singleton')
              .child(
                S.document()
                  .schemaType('caseStudiesPage')
                  .documentId('caseStudiesPage')
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
            // Our Approach Page
            S.listItem()
              .title('Our Approach Page')
              .icon(HiLightBulb)
              .id('approachPage-singleton')
              .child(
                S.document()
                  .schemaType('approachPage')
                  .documentId('approachPage')
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
              .child(
                S.component(DocumentListWithBanner)
                  .id('services-list')
                  .title('Services')
                  .options({
                    schemaType: 'service',
                    message:
                      'Tip: After creating a service, add it to the pages where you want it to appear (Homepage, Services Page).',
                  })
              ),
            // Case Studies
            S.listItem()
              .title('Case Studies')
              .icon(HiTrendingUp)
              .child(
                S.component(DocumentListWithBanner)
                  .id('case-studies-list')
                  .title('Case Studies')
                  .options({
                    schemaType: 'caseStudy',
                    message:
                      'Tip: After creating a case study, add it to the pages where you want it to appear (Case Studies Page).',
                  })
              ),
            // Testimonials
            S.listItem()
              .title('Testimonials')
              .icon(HiChatAlt)
              .child(
                S.component(DocumentListWithBanner)
                  .id('testimonials-list')
                  .title('Testimonials')
                  .options({
                    schemaType: 'testimonial',
                    message:
                      'Tip: After creating a testimonial, add it to the pages where you want it to appear (Homepage).',
                  })
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from "Create new" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filter out actions that shouldn't be available for singletons
    actions: (input, context) => {
      if (!singletonTypes.has(context.schemaType)) {
        return input;
      }

      // For singletons, block problematic actions instead of restricting to only specific ones
      const blockedActions = ['duplicate', 'delete', 'unpublish'];
      return input.filter((actionFn) => {
        const actionName = actionFn.action;
        // Keep actions without an action identifier (don't filter them out)
        if (!actionName) return true;
        return !blockedActions.includes(actionName);
      });
    },
  },
});
