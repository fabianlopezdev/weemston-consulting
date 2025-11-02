# Public Assets

This directory contains static assets that are served directly.

## Required Files

### Icons and Images

- `favicon.svg` - Main favicon (SVG format for all sizes)
- `icon-192.png` - PWA icon (192x192)
- `icon-512.png` - PWA icon (512x512)
- `og-default.png` - Default Open Graph image (1200x630)

### Configuration Files

- `robots.txt` - Search engine crawler instructions
- `manifest.webmanifest` - PWA manifest

## File Naming Conventions

- Use kebab-case for file names
- Optimize all images before uploading
- Use modern formats (WebP, AVIF) when possible
- Provide fallbacks for older browsers

## Image Optimization

Recommended tools:

- [Squoosh](https://squoosh.app/) - Web-based image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app for image optimization
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js image processing library

## Notes

- Files in this directory are served at the root URL
- Example: `public/favicon.svg` → `https://example.com/favicon.svg`
- Do not put sensitive files here (they are publicly accessible)
- Keep this directory organized and clean
