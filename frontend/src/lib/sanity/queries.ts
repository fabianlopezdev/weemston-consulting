import groq from 'groq';

// Helper for image projection with LQIP metadata (reusable across all queries)
const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  alt,
  seoFilename,
  hotspot,
  crop
`;

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
  openInNewTab,
  icon
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
    content
  }
`;

// Services for filter (includes featuredCaseStudies for inverse relationship mapping)
export const servicesForFilterQuery = groq`
  *[_type == "service" && language == $language] | order(title asc) {
    _id,
    title,
    featuredCaseStudies[]-> { _id }
  }
`;

// Case Study projection (simplified - colors now at page level)
const caseStudyProjection = `
  _id,
  client,
  clientLogo {
    asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } },
    alt,
    hotspot,
    crop
  },
  logoVariant,
  date,
  description,
  contributionsTitle,
  contributions,
  relatedService-> { _id, title }
`;

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy" && language == $language && defined(relatedService)] | order(_createdAt desc) {
    ${caseStudyProjection}
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

// Helper for gradient projection (reusable for gradient backgrounds)
const gradientProjection = `
  direction,
  startColor {
    ${colorSelectionProjection}
  },
  endColor {
    ${colorSelectionProjection}
  }
`;

// Helper for background settings projection (flat structure)
const backgroundSettingsProjection = `
  backgroundSettings {
    backgroundType,
    image {
      ${imageProjection}
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
      backgroundType,
      backgroundImage {
        ${imageProjection}
      },
      colorMode,
      gradient {
        direction,
        startColor {
          ${colorSelectionProjection}
        },
        endColor {
          ${colorSelectionProjection}
        }
      },
      backgroundColorType,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      accentColorType,
      accentCustomColor { label, value },
      sectionTitleColor,
      descriptionTextColor,
      linkTextColor,
      cardTextColor,
      titleColorType,
      titleColorShade,
      titleCustomColor { label, value },
      services[]-> {
        _id,
        title,
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
          ${imageProjection}
        }
      },
      showAllLink
    },
    _type == "testimonialsSection" => {
      title,
      showTitle,
      backgroundType,
      backgroundImage {
        ${imageProjection}
      },
      backgroundColorType,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      colorMode,
      gradient {
        direction,
        startColor {
          ${colorSelectionProjection}
        },
        endColor {
          ${colorSelectionProjection}
        }
      },
      cardBackgroundColorType,
      cardBackgroundColorShade,
      cardBackgroundCustomColor { label, value },
      cardBorderColorType,
      cardBorderColorShade,
      cardBorderCustomColor { label, value },
      titleColor,
      textColor,
      testimonials[]-> {
        _id,
        name,
        position,
        company,
        websiteUrl,
        quote,
        avatar {
          ${imageProjection}
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
      tagline,
      fontSize,
      description,
      backgroundType,
      backgroundImage {
        ${imageProjection}
      },
      colorMode,
      gradient {
        direction,
        startColor {
          ${colorSelectionProjection}
        },
        endColor {
          ${colorSelectionProjection}
        }
      },
      backgroundColorType,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      taglineColorType,
      taglineColorShade,
      taglineCustomColor { label, value },
      textColor,
      images[] {
        _key,
        ${imageProjection},
        caption
      }
    },
    _type == "experienceSection" => {
      title,
      description,
      descriptionColor,
      backgroundType,
      backgroundImage {
        ${imageProjection}
      },
      colorMode,
      gradient {
        direction,
        startColor {
          ${colorSelectionProjection}
        },
        endColor {
          ${colorSelectionProjection}
        }
      },
      backgroundColorType,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      badgeColorType,
      badgeColorShade,
      badgeCustomColor { label, value },
      badgeBackgroundColorType,
      badgeBackgroundColorShade,
      badgeBackgroundCustomColor { label, value },
      badgeTextColor,
      circleBackgroundColorType,
      circleBackgroundColorShade,
      circleBackgroundCustomColor { label, value },
      circleTextColor,
      cardDescriptionColor,
      ctaButton {
        ${linkProjection}
      },
      cards[] {
        _key,
        number,
        title,
        description
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
      backgroundColorType,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      accentColorType,
      accentCustomColor { label, value },
      textColor,
      cards[] {
        _key,
        title,
        description,
        type,
        icon {
          name
        },
        image {
          ${imageProjection}
        }
      }
    },
    _type == "collageSection" => {
      tagline,
      taglineSize,
      useAsSectionTitle,
      images[] {
        _key,
        ${imageProjection}
      },
      showDescription,
      description,
      showCta,
      ctaButton {
        ${linkProjection}
      }
    },
    _type == "dividerCtaSection" => {
      spacing,
      lineColorType,
      lineCustomColor { label, value },
      ctaButton {
        ${linkProjection}
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
      content
    },
    ${pageSectionsQuery},
    metaDescription,
    ogImage
  }
`;

// Case Studies Page (singleton per language - OLD)
export const caseStudiesPageOldQuery = groq`
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

// Case Studies Page (singleton - NEW)
export const caseStudiesPageQuery = groq`
  *[_type == "caseStudiesPage"][0] {
    // SEO
    title,
    // Hero
    heroHeading,
    heroHeadingHighlight,
    heroHighlightColorType,
    heroHighlightColorShade,
    heroHighlightCustomColor { label, value },
    heroShowDivider,
    heroDividerColorType,
    heroDividerColorShade,
    heroDividerCustomColor { label, value },
    heroTagline,
    heroTaglineColor,
    heroBackgroundColorType,
    heroBackgroundColorShade,
    heroBackgroundCustomColor { label, value },
    // Intro
    introTitle,
    introDescription,
    introTitleColorType,
    introTitleColorShade,
    introTitleCustomColor { label, value },
    introDescriptionColor,
    introFooter,
    introFooterColorType,
    introFooterColorShade,
    introFooterCustomColor { label, value },
    // Filter
    filterActiveColorType,
    filterActiveColorShade,
    filterActiveCustomColor { label, value },
    filterActiveTextColor,
    filterInactiveColorType,
    filterInactiveColorShade,
    filterInactiveCustomColor { label, value },
    filterInactiveTextColor,
    // Box Styling
    boxBgColorType,
    boxBgColorShade,
    boxBgCustomColor { label, value },
    boxHoverBgColorType,
    boxHoverBgColorShade,
    boxHoverBgCustomColor { label, value },
    tagColorType,
    tagColorShade,
    tagCustomColor { label, value },
    ctaTextColor,
    // Modal Styling
    modalLeftBgColorType,
    modalLeftBgColorShade,
    modalLeftBgCustomColor { label, value },
    modalBackdropColorType,
    modalBackdropColorShade,
    modalBackdropCustomColor { label, value },
    modalClientNameColorType,
    modalClientNameColorShade,
    modalClientNameCustomColor { label, value },
    modalDateColorType,
    modalDateColorShade,
    modalDateCustomColor { label, value },
    modalDividerColorType,
    modalDividerColorShade,
    modalDividerCustomColor { label, value },
    modalDescriptionColor,
    modalContributionsTitleColorType,
    modalContributionsTitleColorShade,
    modalContributionsTitleCustomColor { label, value },
    modalContributionsTextColor,
    modalBulletColorType,
    modalBulletColorShade,
    modalBulletCustomColor { label, value },
    // Quote colors
    modalQuoteTextColor,
    modalQuoteBorderColorType,
    modalQuoteBorderColorShade,
    modalQuoteBorderCustomColor { label, value },
    modalQuoteAuthorColor,
    // Case Studies (simplified - colors at page level)
    caseStudies[]-> {
      _id,
      client,
      clientLogo {
        asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } },
        alt,
        hotspot,
        crop
      },
      logoVariant,
      date,
      description,
      contributionsTitle,
      contributions,
      relatedService-> { _id, title }
    },
    // All testimonials for matching with case studies
    "testimonials": *[_type == "testimonial"] {
      _id,
      name,
      position,
      company,
      quote
    },
    // SEO
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
    metaDescription,
    ogImage,
    // Left Panel
    leftColorMode,
    leftBackgroundColorType,
    leftBackgroundColorShade,
    leftBackgroundCustomColor { label, value },
    leftGradient {
      ${gradientProjection}
    },
    leftHeading,
    leftHeadingColorType,
    leftHeadingColorShade,
    leftHeadingCustomColor { label, value },
    leftDescription,
    leftDescriptionColorType,
    leftDescriptionColorShade,
    leftDescriptionCustomColor { label, value },
    leftQuote,
    leftQuoteColorType,
    leftQuoteColorShade,
    leftQuoteCustomColor { label, value },
    leftQuoteBorderColorType,
    leftQuoteBorderColorShade,
    leftQuoteBorderCustomColor { label, value },
    email,
    emailLinkColorType,
    emailLinkColorShade,
    emailLinkCustomColor { label, value },
    emailHoverColorType,
    emailHoverColorShade,
    emailHoverCustomColor { label, value },
    // Right Panel
    rightColorMode,
    rightBackgroundColorType,
    rightBackgroundColorShade,
    rightBackgroundCustomColor { label, value },
    rightGradient {
      ${gradientProjection}
    },
    formNameLabel,
    formNamePlaceholder,
    formEmailLabel,
    formEmailPlaceholder,
    formMessageLabel,
    formMessagePlaceholder,
    formLabelColorType,
    formLabelColorShade,
    formLabelCustomColor { label, value },
    formSubmitText,
    formSubmitButtonColor {
      colorType,
      shade,
      useBaseTextColor,
      customColor { label, value }
    },
    formFocusColorType,
    formFocusColorShade,
    formFocusCustomColor { label, value }
  }
`;

// About Page (singleton)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    _id,
    title,
    metaDescription,
    ogImage,
    // Hero Section
    heroBackgroundColorType,
    heroBackgroundColorMode,
    heroBackgroundColorShade,
    heroBackgroundCustomColor { label, value },
    heroBackgroundGradient {
      ${gradientProjection}
    },
    heroHeading,
    heroHeadingHighlight,
    heroHighlightColorType,
    heroHighlightColorShade,
    heroHighlightCustomColor { label, value },
    heroShowDivider,
    heroDividerColorType,
    heroDividerColorShade,
    heroDividerCustomColor { label, value },
    heroTagline,
    heroTaglineColor,
    // Bio Section
    bioBackgroundColorType,
    bioBackgroundColorMode,
    bioBackgroundColorShade,
    bioBackgroundCustomColor { label, value },
    bioBackgroundGradient {
      ${gradientProjection}
    },
    bioImage {
      ${imageProjection}
    },
    bioLabel,
    bioLabelColorType,
    bioLabelColorShade,
    bioLabelCustomColor { label, value },
    bioName,
    bioNameColorType,
    bioNameColorShade,
    bioNameCustomColor { label, value },
    bioDescription,
    bioDescriptionColor,
    // Info Grid Section
    infoGridBackgroundColorType,
    infoGridBackgroundColorMode,
    infoGridBackgroundColorShade,
    infoGridBackgroundCustomColor { label, value },
    infoGridBackgroundGradient {
      ${gradientProjection}
    },
    infoCards[] {
      _key,
      icon { name },
      iconColorType,
      iconColorShade,
      iconCustomColor { label, value },
      title,
      titleColorType,
      titleColorShade,
      titleCustomColor { label, value },
      content
    },
    // Trusted By Section
    trustedByBackgroundColorType,
    trustedByBackgroundColorMode,
    trustedByBackgroundColorShade,
    trustedByBackgroundCustomColor { label, value },
    trustedByBackgroundGradient {
      ${gradientProjection}
    },
    trustedByTitle,
    trustedByShowTitle,
    trustedByTitleColorType,
    trustedByTitleColorShade,
    trustedByTitleCustomColor { label, value },
    trustedByCaseStudies[]-> {
      _id,
      client,
      clientLogo {
        asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } },
        alt, hotspot, crop
      },
      logoVariant
    }
  }
`;

// Approach Page (singleton)
export const approachPageQuery = groq`
  *[_type == "approachPage"][0] {
    _id,
    title,
    metaDescription,
    ogImage,
    // Hero
    heroHeading,
    heroHeadingHighlight,
    heroHighlightColorType,
    heroHighlightColorShade,
    heroHighlightCustomColor { label, value },
    heroShowDivider,
    heroDividerColorType,
    heroDividerColorShade,
    heroDividerCustomColor { label, value },
    heroBackgroundColorType,
    heroBackgroundColorMode,
    heroBackgroundColorShade,
    heroBackgroundCustomColor { label, value },
    heroBackgroundGradient {
      ${gradientProjection}
    },
    heroTagline,
    heroTaglineColor,
    // Core Values
    coreValuesBackgroundColorType,
    coreValuesBackgroundColorMode,
    coreValuesBackgroundColorShade,
    coreValuesBackgroundCustomColor { label, value },
    coreValuesBackgroundGradient {
      ${gradientProjection}
    },
    coreValuesCardBackgroundColorType,
    coreValuesCardBackgroundColorShade,
    coreValuesCardBackgroundCustomColor { label, value },
    coreValuesCardTitleColorType,
    coreValuesCardTitleColorShade,
    coreValuesCardTitleCustomColor { label, value },
    coreValuesTitle,
    coreValuesShowTitle,
    coreValuesTitleColorType,
    coreValuesTitleColorShade,
    coreValuesTitleCustomColor { label, value },
    coreValuesCards[] {
      _key,
      icon { name },
      iconColorType,
      iconColorShade,
      iconCustomColor { label, value },
      title,
      titleColorType,
      titleColorShade,
      titleCustomColor { label, value },
      description
    },
    // Founder Section
    founderBackgroundColorType,
    founderBackgroundColorMode,
    founderBackgroundColorShade,
    founderBackgroundCustomColor { label, value },
    founderBackgroundGradient {
      ${gradientProjection}
    },
    founderTagline,
    founderTaglineColorType,
    founderTaglineColorShade,
    founderTaglineCustomColor { label, value },
    founderTitle,
    founderTitleColorType,
    founderTitleColorShade,
    founderTitleCustomColor { label, value },
    founderContent,
    founderTextColor,
    founderQuote,
    founderQuoteColorType,
    founderQuoteColorShade,
    founderQuoteCustomColor { label, value },
    founderImage {
      ${imageProjection}
    },
    // Highlight Section
    highlightTitle,
    highlightTitleColorType,
    highlightTitleColorShade,
    highlightTitleCustomColor { label, value },
    highlightContent,
    highlightTextColor,
    highlightBackgroundColorType,
    highlightBackgroundColorMode,
    highlightBackgroundColorShade,
    highlightBackgroundCustomColor { label, value },
    highlightBackgroundGradient {
      ${gradientProjection}
    },
    // Collage Section
    collageEnabled,
    collageTagline,
    collageTaglineSize,
    collageUseAsSectionTitle,
    collageImages[] {
      _key,
      ${imageProjection}
    },
    collageShowDescription,
    collageDescription,
    collageShowCta,
    collageCtaButton {
      ${linkProjection}
    }
  }
`;

// Services Page (new design - singleton)
export const servicesPageNewQuery = groq`
  *[_type == "servicesPage"][0] {
    _id,
    title,
    metaDescription,
    ogImage,
    // Hero
    heroBackgroundColorType,
    heroBackgroundColorMode,
    heroBackgroundColorShade,
    heroBackgroundCustomColor { label, value },
    heroBackgroundGradient {
      ${gradientProjection}
    },
    heroHeading,
    heroHeadingHighlight,
    heroHighlightColorType,
    heroHighlightColorShade,
    heroHighlightCustomColor { label, value },
    heroShowDivider,
    heroDividerColorType,
    heroDividerColorShade,
    heroDividerCustomColor { label, value },
    heroTagline,
    heroTaglineColor,
    // Services - dereferenced from service documents
    services[]-> {
      _id,
      title,
      tag,
      leadText,
      description,
      iconType,
      icon,
      iconImage {
        ${imageProjection}
      },
      imagePosition,
      // Color settings
      backgroundColorType,
      backgroundColorMode,
      backgroundColorShade,
      backgroundCustomColor { label, value },
      backgroundGradient {
        ${gradientProjection}
      },
      titleColorType,
      titleColorShade,
      titleCustomColor { label, value },
      tagColor,
      leadTextColor,
      descriptionTextColor,
      iconColorType,
      iconColorShade,
      iconCustomColor { label, value },
      iconContainerColorType,
      iconContainerColorShade,
      iconContainerCustomColor { label, value },
      // List settings
      listStyle,
      listTitle,
      listItems,
      listTextColor,
      listContainerColorType,
      listContainerColorShade,
      listContainerCustomColor { label, value },
      listIconColorType,
      listIconColorShade,
      listIconCustomColor { label, value },
      // Case Studies Section
      caseStudiesSectionTitle,
      caseStudiesTitleColorType,
      caseStudiesTitleColorShade,
      caseStudiesTitleCustomColor { label, value },
      logoDisplayMode,
      featuredCaseStudies[]-> {
        _id,
        client,
        logoVariant,
        clientLogo {
          asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } },
          alt, hotspot, crop
        }
      }
    }
  }
`;
