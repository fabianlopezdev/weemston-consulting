// Object types
import seo from './objects/seo';
import portableText from './objects/portableText';
import media from './objects/media';
import link from './objects/link';

// Section types
import heroSection from './objects/sections/heroSection';
import featuredServicesSection from './objects/sections/featuredServicesSection';
import featuredCaseStudiesSection from './objects/sections/featuredCaseStudiesSection';
import testimonialsSection from './objects/sections/testimonialsSection';
import faqSection from './objects/sections/faqSection';
import aboutSection from './objects/sections/aboutSection';

// Document types
import service from './documents/service';
import caseStudy from './documents/caseStudy';
import legal from './documents/legal';
import testimonial from './documents/testimonial';

// Singletons
import siteSettings from './singletons/siteSettings';
import homepage from './singletons/homepage';
import servicesPage from './singletons/servicesPage';
import caseStudiesPage from './singletons/caseStudiesPage';
import contactPage from './singletons/contactPage';
import aboutPage from './singletons/aboutPage';

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  media,
  link,
  // Sections
  heroSection,
  featuredServicesSection,
  featuredCaseStudiesSection,
  testimonialsSection,
  faqSection,
  aboutSection,
  // Documents
  service,
  caseStudy,
  legal,
  testimonial,
  // Singletons
  siteSettings,
  homepage,
  servicesPage,
  caseStudiesPage,
  contactPage,
  aboutPage,
];
