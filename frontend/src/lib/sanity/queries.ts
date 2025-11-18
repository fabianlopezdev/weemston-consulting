import groq from 'groq';

// Helper for link projection (reusable across all queries)
const linkProjection = `
  text,
  linkType,
  internalPageType,
  serviceReference-> { slug },
  caseStudyReference-> { slug },
  legalReference-> { slug },
  externalUrl,
  openInNewTab
`;

// Site Settings (field-level i18n)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    header {
      displayMode,
      logo
    },
    favicon,
    colors {
      primary,
      secondary,
      accent
    },
    social[] {
      platform,
      url
    },
    navigation[] {
      _key,
      ${linkProjection}
    },
    footer {
      text,
      links[] {
        _key,
        ${linkProjection}
      }
    }
  }
`;

// Services (document-level i18n)
export const serviceQuery = groq`
  *[_type == "service" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    description,
    features[],
    icon,
    content,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const allServicesQuery = groq`
  *[_type == "service" && language == $language] | order(_createdAt desc) {
    _id,
    title,
    slug,
    language,
    description,
    icon
  }
`;

// Case Studies (document-level i18n)
export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    client,
    industry,
    publishedAt,
    featured,
    mainImage,
    challenge,
    solution,
    results,
    testimonial {
      quote,
      author,
      position
    },
    gallery[],
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    client,
    industry,
    publishedAt,
    featured,
    mainImage
  }
`;

// Legal Pages
export const legalPageQuery = groq`
  *[_type == "legal" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    content,
    lastUpdated
  }
`;

// Helper for page sections query (reusable across all pages)
const pageSectionsQuery = `
  sections[] {
    _type,
    enabled,
    _type == "featuredServicesSection" => {
      title,
      description,
      services[]-> {
        _id,
        title,
        slug,
        description,
        icon
      },
      showAllLink
    },
    _type == "featuredCaseStudiesSection" => {
      title,
      description,
      caseStudies[]-> {
        _id,
        title,
        slug,
        client,
        mainImage {
          asset,
          alt
        }
      },
      showAllLink
    },
    _type == "testimonialsSection" => {
      title,
      testimonials[]-> {
        _id,
        name,
        position,
        company,
        quote,
        avatar {
          asset,
          alt
        }
      }
    },
    _type == "faqSection" => {
      title,
      faqs[] {
        question,
        answer
      }
    },
    _type == "aboutSection" => {
      title,
      content,
      images[] {
        _key,
        asset,
        alt,
        caption
      }
    }
  }
`;

// Homepage (singleton per language)
export const homepageQuery = groq`
  *[_id == $documentId][0] {
    _id,
    title,
    language,
    hero {
      enabled,
      tagline,
      heading,
      subheading,
      ctaButton {
        ${linkProjection}
      },
      backgroundImage {
        asset,
        alt
      }
    },
    ${pageSectionsQuery},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Services Page (singleton per language)
export const servicesPageQuery = groq`
  *[_id == $documentId][0] {
    _id,
    title,
    language,
    hero {
      tagline,
      heading,
      subheading,
      ctaButton {
        ${linkProjection}
      },
      backgroundImage {
        asset,
        alt
      }
    },
    ${pageSectionsQuery},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Case Studies Page (singleton per language)
export const caseStudiesPageQuery = groq`
  *[_id == $documentId][0] {
    _id,
    title,
    language,
    hero {
      tagline,
      heading,
      subheading,
      ctaButton {
        ${linkProjection}
      },
      backgroundImage {
        asset,
        alt
      }
    },
    ${pageSectionsQuery},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Contact Page (singleton per language)
export const contactPageQuery = groq`
  *[_id == $documentId][0] {
    _id,
    title,
    language,
    hero {
      tagline,
      heading,
      subheading,
      ctaButton {
        ${linkProjection}
      },
      backgroundImage {
        asset,
        alt
      }
    },
    ${pageSectionsQuery},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// About Page (singleton per language)
export const aboutPageQuery = groq`
  *[_id == $documentId][0] {
    _id,
    title,
    language,
    hero {
      tagline,
      heading,
      subheading,
      ctaButton {
        ${linkProjection}
      },
      backgroundImage {
        asset,
        alt
      }
    },
    ${pageSectionsQuery},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;
