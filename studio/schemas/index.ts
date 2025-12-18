// Object types
import seo from './objects/seo';
import portableText from './objects/portableText';
import media from './objects/media';
import link from './objects/link';
import navigationLink from './objects/navigationLink';
import buttonColor from './objects/buttonColor';
import experienceCard from './objects/experienceCard';
import howWeWorkCard from './objects/howWeWorkCard';
import approachValueCard from './objects/approachValueCard';
import aboutInfoCard from './objects/aboutInfoCard';

// Section types
import heroSection from './objects/sections/heroSection';
import featuredServicesSection from './objects/sections/featuredServicesSection';
import featuredCaseStudiesSection from './objects/sections/featuredCaseStudiesSection';
import testimonialsSection from './objects/sections/testimonialsSection';
import faqSection from './objects/sections/faqSection';
import aboutSection from './objects/sections/aboutSection';
import experienceSection from './objects/sections/experienceSection';
import ourApproachSection from './objects/sections/ourApproachSection';
import howWeWorkSection from './objects/sections/howWeWorkSection';
import dividerCtaSection from './objects/sections/dividerCtaSection';
import collageSection from './objects/sections/collageSection';

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
import approachPage from './singletons/approachPage';

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  media,
  link,
  navigationLink,
  buttonColor,
  experienceCard,
  howWeWorkCard,
  approachValueCard,
  aboutInfoCard,
  // Sections
  heroSection,
  featuredServicesSection,
  featuredCaseStudiesSection,
  testimonialsSection,
  faqSection,
  aboutSection,
  experienceSection,
  ourApproachSection,
  howWeWorkSection,
  dividerCtaSection,
  collageSection,
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
  approachPage,
];
