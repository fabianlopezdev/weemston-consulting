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

export type LinkData = InternalLink | ExternalLink;

// Broader type for input that may not be fully discriminated
interface GenericLinkData {
  linkType: 'internal' | 'external';
  internalPageType?: string;
  caseStudyReference?: { slug: { current: string } };
  legalReference?: { slug: { current: string } };
  externalUrl?: string;
}

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
export function resolveLinkUrl(link: GenericLinkData): string {
  if (link.linkType === 'external') {
    return link.externalUrl || '/';
  }

  // Internal link
  const { internalPageType } = link;

  // Check if it's a singleton page
  if (internalPageType && internalPageType in PAGE_TYPE_URLS) {
    return PAGE_TYPE_URLS[internalPageType] ?? '/';
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
export function shouldOpenInNewTab(link: GenericLinkData): boolean {
  return link.linkType === 'external';
}
