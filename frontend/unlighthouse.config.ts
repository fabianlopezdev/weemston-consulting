export default {
  site: process.env.UNLIGHTHOUSE_SITE || 'http://localhost:4321',
  scanner: {
    // Crawl the entire site
    samples: 1,
    throttle: false,
    // Skip external links
    skipJavascript: false,
  },
  lighthouseOptions: {
    // Use mobile by default
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
  budgets: [
    {
      path: '/*',
      resourceSizes: [
        {
          resourceType: 'document',
          budget: 50,
        },
        {
          resourceType: 'script',
          budget: 250,
        },
        {
          resourceType: 'stylesheet',
          budget: 50,
        },
        {
          resourceType: 'image',
          budget: 250,
        },
        {
          resourceType: 'font',
          budget: 100,
        },
        {
          resourceType: 'total',
          budget: 700,
        },
      ],
      timings: [
        {
          metric: 'interactive',
          budget: 3000,
        },
        {
          metric: 'first-contentful-paint',
          budget: 1500,
        },
        {
          metric: 'largest-contentful-paint',
          budget: 2500,
        },
      ],
    },
  ],
  ci: {
    // Fail CI if any page scores below these thresholds
    budget: {
      performance: 90,
      accessibility: 95,
      'best-practices': 90,
      seo: 95,
    },
  },
};
