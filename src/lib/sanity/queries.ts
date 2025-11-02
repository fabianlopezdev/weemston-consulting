import groq from 'groq';

// Site Settings (field-level i18n)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
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
      text,
      href,
      external
    },
    footer {
      text,
      links[] {
        _key,
        text,
        href,
        external
      }
    },
    analyticsEnabled,
    analyticsId,
    cookieConsentEnabled,
    redirects[] {
      _key,
      from,
      to,
      permanent
    }
  }
`;

// Pages (document-level i18n)
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    content,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const allPagesQuery = groq`
  *[_type == "page" && language == $language] {
    _id,
    title,
    slug,
    language
  }
`;

// Blog Posts (document-level i18n)
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    publishedAt,
    author-> {
      name,
      image
    },
    categories[]-> {
      title,
      slug
    },
    mainImage,
    excerpt,
    content,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const allBlogPostsQuery = groq`
  *[_type == "blogPost" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    publishedAt,
    author-> {
      name,
      image
    },
    categories[]-> {
      title,
      slug
    },
    mainImage,
    excerpt
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
