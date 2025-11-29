import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from 'sanity:client';

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Image data from Sanity with optional SEO filename
 */
interface SanityImageData {
  asset?: { _ref?: string };
  alt?: string;
  seoFilename?: string;
}

/**
 * Generates an image URL with optional vanity filename for SEO
 * Appends the seoFilename (or falls back to a sanitized alt text) to the URL
 * Example: https://cdn.sanity.io/images/.../hash.jpg/seo-friendly-name.jpg
 */
export function urlForImageWithSeoFilename(
  image: SanityImageData,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!image?.asset) return '';

  let imageBuilder = builder.image(image);

  if (options?.width) imageBuilder = imageBuilder.width(options.width);
  if (options?.height) imageBuilder = imageBuilder.height(options.height);
  if (options?.quality) imageBuilder = imageBuilder.quality(options.quality);

  // Auto-format to webp for best performance
  imageBuilder = imageBuilder.auto('format');

  const baseUrl = imageBuilder.url();

  // If seoFilename is provided, append it as a vanity filename
  if (image.seoFilename) {
    // Sanitize the filename: lowercase, replace spaces with hyphens, remove special chars
    const sanitizedFilename = image.seoFilename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Get the file extension from the URL
    const extension =
      baseUrl.match(/\.(jpg|jpeg|png|webp|gif)/i)?.[0] || '.jpg';

    return `${baseUrl}/${sanitizedFilename}${extension}`;
  }

  return baseUrl;
}
