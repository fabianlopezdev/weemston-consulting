// Object types
import seo from './objects/seo';
import portableText from './objects/portableText';
import media from './objects/media';
import link from './objects/link';

// Document types
import page from './documents/page';
import blogPost from './documents/blogPost';
import service from './documents/service';
import caseStudy from './documents/caseStudy';
import legal from './documents/legal';
import author from './documents/author';
import category from './documents/category';

// Singletons
import siteSettings from './singletons/siteSettings';

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  media,
  link,
  // Documents
  page,
  blogPost,
  service,
  caseStudy,
  legal,
  author,
  category,
  // Singletons
  siteSettings,
];
