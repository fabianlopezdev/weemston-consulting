import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@lib/sanity/client';

const builder = imageUrlBuilder(client);

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  dpr?: 1 | 2 | 3;
}

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

export function getImageUrl(
  source: SanityImageSource,
  options: ImageOptions = {}
): string {
  let urlBuilder = builder.image(source);

  if (options.width) {
    urlBuilder = urlBuilder.width(options.width);
  }

  if (options.height) {
    urlBuilder = urlBuilder.height(options.height);
  }

  if (options.quality) {
    urlBuilder = urlBuilder.quality(options.quality);
  }

  if (options.format) {
    urlBuilder = urlBuilder.format(options.format);
  }

  if (options.fit) {
    urlBuilder = urlBuilder.fit(options.fit);
  }

  if (options.dpr) {
    urlBuilder = urlBuilder.dpr(options.dpr);
  }

  return urlBuilder.url();
}

export function getSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600, 2400]
): string {
  return widths
    .map((width) => {
      const url = getImageUrl(source, { width, format: 'webp' });
      return `${url} ${width}w`;
    })
    .join(', ');
}

export function getImageDimensions(source: SanityImageSource): {
  width: number;
  height: number;
  aspectRatio: number;
} | null {
  const image = builder.image(source);
  // @ts-expect-error - accessing internal properties
  const asset = image.options.source?.asset;

  if (!asset?.metadata?.dimensions) {
    return null;
  }

  const { width, height } = asset.metadata.dimensions;
  return {
    width,
    height,
    aspectRatio: width / height,
  };
}
