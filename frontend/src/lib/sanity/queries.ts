import groq from 'groq';

// Helper for link projection (reusable across all queries)
const linkProjection = `
  text,
  buttonColor {
    colorType,
    shade,
    useBaseTextColor,
    customColor {
      label,
      value
    }
  },
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
    logos {
      variant1,
      variant2
    },
    header {
      displayMode,
      logoVariant
    },
    favicon,
    colors {
      primary {
        label,
        value
      },
      secondary {
        label,
        value
      },
      accent {
        label,
        value
      }
    },
    buttonStyles {
      borderRadius,
      verticalPadding,
      horizontalPadding
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
      logoVariant,
      links[] {
        _key,
        ${linkProjection}
      }
    }
  }
`;

// Services (document-level i18n)
export const allServicesQuery = groq`
  *[_type == "service" && language == $language] | order(_createdAt desc) {
    _id,
    title,
    language,
    icon,
    content
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
    mainImage {
      asset,
      alt,
      seoFilename
    },
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
    mainImage {
      asset,
      alt,
      seoFilename
    }
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

// Helper for color settings projection (reusable for background colors)
const colorSelectionProjection = `
  colorType,
  shade,
  customColor {
    label,
    value
  }
`;

// Helper for background settings projection (flat structure)
const backgroundSettingsProjection = `
  backgroundSettings {
    backgroundType,
    image {
      asset,
      alt,
      seoFilename
    },
    colorMode,
    solidColorType,
    solidColorShade,
    solidCustomColor {
      label,
      value
    },
    gradient {
      direction,
      startColor {
        ${colorSelectionProjection}
      },
      endColor {
        ${colorSelectionProjection}
      }
    }
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
        label,
        icon,
        homepageText
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
          alt,
          seoFilename
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
        websiteUrl,
        quote,
        avatar {
          asset,
          alt,
          seoFilename
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
      showTitle,
      content,
      images[] {
        _key,
        asset,
        alt,
        seoFilename,
        caption
      }
    },
    _type == "experienceSection" => {
      title,
      description,
      cards[] {
        _key,
        number,
        title,
        description,
        iconOrImage {
          type,
          icon {
            name
          },
          image {
            asset,
            alt,
            seoFilename
          }
        }
      }
    },
    _type == "ourApproachSection" => {
      title,
      intro,
      content
    },
    _type == "howWeWorkSection" => {
      title,
      description,
      cards[] {
        _key,
        title,
        description,
        type,
        icon {
          name
        },
        image {
          asset,
          alt,
          seoFilename
        }
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
      taglineColor,
      heading,
      headingColor,
      subheading,
      subheadingColor,
      ctaButton {
        ${linkProjection}
      },
      ${backgroundSettingsProjection}
    },
    ${pageSectionsQuery},
    metaDescription,
    ogImage
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
      taglineColor,
      heading,
      headingColor,
      subheading,
      subheadingColor,
      ctaButton {
        ${linkProjection}
      },
      ${backgroundSettingsProjection}
    },
    intro,
    services[]-> {
      _id,
      title,
      icon,
      content
    },
    ${pageSectionsQuery},
    metaDescription,
    ogImage
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
      taglineColor,
      heading,
      headingColor,
      subheading,
      subheadingColor,
      ctaButton {
        ${linkProjection}
      },
      ${backgroundSettingsProjection}
    },
    ${pageSectionsQuery},
    metaDescription,
    ogImage
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
      taglineColor,
      heading,
      headingColor,
      subheading,
      subheadingColor,
      ctaButton {
        ${linkProjection}
      },
      ${backgroundSettingsProjection}
    },
    ${pageSectionsQuery},
    metaDescription,
    ogImage
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
      taglineColor,
      heading,
      headingColor,
      ${backgroundSettingsProjection}
    },
    content,
    metaDescription,
    ogImage
  }
`;
