# Website Boilerplate

A production-ready Astro + TypeScript + Sanity boilerplate with built-in i18n, accessibility, and comprehensive testing.

## Features

- **Framework:** Astro 5.x with hybrid rendering
- **CMS:** Sanity v3 with hybrid i18n approach
- **Styling:** Modern CSS with light-dark() for automatic dark mode
- **Internationalization:** JSON-based UI translations + Sanity content localization
- **TypeScript:** Strict mode with full type safety
- **Testing:** Vitest (unit) + Playwright (E2E with axe-core) + Unlighthouse (performance)
- **Code Quality:** ESLint 9 (flat config), Prettier, Husky, lint-staged, Commitlint
- **CI/CD:** GitHub Actions with automated testing and deployment
- **Accessibility:** WCAG 2.1 AA compliant with automated testing
- **SEO:** Structured data, hreflang, sitemaps, OG images
- **Security:** CSP headers, secrets detection, form bot protection
- **Package Manager:** Bun (mandatory)

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) 1.0+ (required)
- Node.js 18+ (for some tooling)
- [Sanity CLI](https://www.sanity.io/docs/cli) installed globally

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd weemston-consulting

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
bun dev

# In another terminal, start Sanity Studio
bun sanity:dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Sanity
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token

# Site
PUBLIC_SITE_URL=http://localhost:4321

# Email (choose one provider)
EMAIL_PROVIDER=resend
# RESEND_API_KEY=your_resend_key
# SENDGRID_API_KEY=your_sendgrid_key
# POSTMARK_API_KEY=your_postmark_key
EMAIL_FROM=noreply@example.com
EMAIL_TO=hello@example.com

# Analytics (optional)
# PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Development

```bash
# Start dev server (localhost:4321)
bun dev

# Start Sanity Studio (localhost:3333)
bun sanity:dev

# Type checking
bun check

# Linting
bun lint
bun lint:fix

# Testing
bun test              # Unit tests
bun test:e2e          # E2E tests
bun test:e2e:ui       # E2E tests with UI
bun unlighthouse      # Performance tests
```

## Building for Production

```bash
# Build the site
bun build

# Preview production build
bun preview

# Build Sanity Studio
bun sanity:build
bun sanity:deploy
```

## Project Structure

```
.
├── .github/              # GitHub Actions, templates
├── .husky/               # Git hooks
├── public/               # Static assets
├── sanity/               # Sanity Studio & schemas
│   ├── lib/              # Sanity utilities
│   ├── schemas/          # Content schemas
│   └── sanity.config.ts  # Studio configuration
├── src/
│   ├── assets/           # Styles and design tokens
│   ├── components/       # Astro components
│   │   ├── forms/        # Form components
│   │   ├── i18n/         # Language switcher
│   │   ├── layout/       # Header, footer, skip link
│   │   ├── media/        # Image, video components
│   │   └── seo/          # SEO and structured data
│   ├── i18n/             # Translation files
│   │   └── locales/      # JSON translations per language
│   ├── layouts/          # Page layouts
│   ├── lib/              # Utilities and libraries
│   │   ├── env/          # Environment validation
│   │   ├── forms/        # Form handler with bot protection
│   │   ├── i18n/         # i18n utilities
│   │   ├── sanity/       # Sanity client and queries
│   │   └── utils/        # General utilities
│   ├── middleware.ts     # Language detection
│   ├── pages/            # Astro pages
│   │   ├── api/          # API endpoints
│   │   ├── blog/         # Blog pages
│   │   ├── case-studies/ # Case study pages
│   │   └── services/     # Service pages
│   └── env.d.ts          # TypeScript definitions
├── tests/
│   ├── e2e/              # Playwright E2E tests
│   ├── unit/             # Vitest unit tests
│   ├── setup.ts          # Test setup
│   └── TESTING.md        # Testing documentation
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest configuration
├── playwright.config.ts  # Playwright configuration
└── unlighthouse.config.ts # Performance testing
```

## Internationalization (i18n)

This boilerplate uses a **hybrid i18n approach**:

### UI Strings (JSON)

UI elements like navigation, forms, and error messages are stored in JSON files:

- Located in `src/i18n/locales/`
- Managed in the codebase (version controlled)
- Type-safe with TypeScript
- Fast and efficient (no API calls)

```typescript
import { createTranslator } from '@lib/i18n/translations';

const t = createTranslator('en');
const text = t('nav.home'); // "Home"
```

### Content (Sanity)

Page content, blog posts, and dynamic content use Sanity:

- **Document-level i18n:** Separate documents per language (pages, blog, services, case studies)
- **Field-level i18n:** Shared documents with localized fields (site settings)
- Managed by content editors in Sanity Studio
- Flexible and user-friendly

### Adding a New Language

1. Add language to `src/lib/i18n/config.ts`
2. Create translation file: `src/i18n/locales/{lang}.json`
3. Add language to `sanity/lib/i18n.ts`
4. Create content in Sanity Studio for the new language
5. Update `astro.config.mjs` i18n configuration

## Content Management (Sanity)

### Content Types

- **Pages:** Generic pages (Home, About, etc.)
- **Blog Posts:** Articles with categories and authors
- **Services:** Service offerings
- **Case Studies:** Client work examples
- **Legal Pages:** Privacy Policy, Terms of Service
- **Site Settings:** Global site configuration

### Sanity Studio

Access the Studio at `http://localhost:3333` during development.

```bash
# Start Studio
bun sanity:dev

# Deploy Studio to Sanity
bun sanity:deploy

# Manage datasets
bun sanity dataset list
bun sanity dataset create staging
```

## Testing

Comprehensive testing strategy with multiple tools. See [tests/TESTING.md](tests/TESTING.md) for detailed documentation.

### Unit Tests (Vitest)

- Test utilities, functions, and components
- Coverage thresholds: 80%

### E2E Tests (Playwright)

- Cross-browser testing (Chrome, Firefox, Safari, Mobile)
- Automated accessibility scanning with axe-core
- WCAG 2.1 AA compliance verification

### Performance Tests (Unlighthouse)

- Lighthouse CI audits
- Performance budgets enforcement
- Accessibility and SEO scoring

## Accessibility

This boilerplate is WCAG 2.1 AA compliant:

- Semantic HTML5
- ARIA labels and descriptions
- Keyboard navigation support
- Skip links for screen readers
- Color contrast validation
- Automated testing with axe-core
- Focus management
- Responsive and mobile-friendly

## Performance

- **Build output:** Optimized static HTML + minimal JavaScript
- **Image optimization:** Automatic with Sanity image pipeline
- **Code splitting:** Automatic with Astro
- **CSS:** Modern CSS with minimal runtime
- **Performance budgets:** Enforced via Unlighthouse

## Security

- **Form protection:** Honeypot + time-trap bot detection
- **Secrets detection:** Pre-commit hook prevents committing secrets
- **CSP headers:** Content Security Policy (configure in deployment)
- **Environment validation:** Zod schema for environment variables
- **Dependency updates:** Automated with Renovate

## Git Workflow

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): format code
refactor(scope): refactor code
test(scope): add tests
chore(scope): update tooling
```

**Scope is mandatory.** Allowed scopes: config, deps, sanity, components, pages, lib, tests, docs

### Pre-commit Hooks

Husky runs these checks before each commit:

- ESLint (auto-fix)
- Prettier (auto-format)
- Secrets detection
- TypeScript type checking (on push)

## Deployment

### Recommended Platforms

- **Vercel:** Zero-config deployment
- **Netlify:** One-click deploy
- **Cloudflare Pages:** Global CDN
- **Custom server:** Node.js with adapter-node

### Environment-Specific Configuration

For staging/production, update:

1. `PUBLIC_SITE_URL` in `.env`
2. Sitemap URL in `public/robots.txt`
3. Sanity CORS origins in Sanity project settings
4. CSP headers in deployment platform

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Sanity Studio deployed
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Analytics connected (if applicable)
- [ ] Error monitoring setup
- [ ] Performance monitoring enabled
- [ ] Redirects configured
- [ ] 404/500 pages tested
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse)

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the code style
3. Write/update tests
4. Ensure all tests pass
5. Commit with conventional commit messages
6. Create a pull request

## License

[Add your license here]

## Credits

Developed by [Fabulous Apps](https://fabapps.dev/)
