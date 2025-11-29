/**
 * Resolves Sanity link objects to actual URLs
 */

interface InternalLink {
  linkType: 'internal';
  internalPageType:
    | 'homepage'
    | 'servicesPage'
    | 'caseStudiesPage'
    | 'contactPage'
    | 'aboutPage'
    | 'caseStudy'
    | 'legal';
  caseStudyReference?: { slug: { current: string } };
  legalReference?: { slug: { current: string } };
}

interface ExternalLink {
  linkType: 'external';
  externalUrl: string;
}

type LinkData = InternalLink | ExternalLink;

/**
 * Maps internal page types to their URLs
 */
const PAGE_TYPE_URLS: Record<string, string> = {
  homepage: '/',
  servicesPage: '/services',
  caseStudiesPage: '/case-studies',
  contactPage: '/contact',
  aboutPage: '/about',
};

/**
 * Resolves a link object from Sanity to a URL string
 */
export function resolveLinkUrl(link: LinkData): string {
  if (link.linkType === 'external') {
    return link.externalUrl;
  }

  // Internal link
  const { internalPageType } = link;

  // Check if it's a singleton page
  if (internalPageType in PAGE_TYPE_URLS) {
    return PAGE_TYPE_URLS[internalPageType];
  }

  // Handle document-based pages with slugs
  if (internalPageType === 'caseStudy' && link.caseStudyReference) {
    return `/case-studies/${link.caseStudyReference.slug.current}`;
  }

  if (internalPageType === 'legal' && link.legalReference) {
    return `/${link.legalReference.slug.current}`;
  }

  // Fallback
  return '/';
}

/**
 * Determines if a link should open in a new tab
 */
export function shouldOpenInNewTab(link: LinkData): boolean {
  return link.linkType === 'external';
}
