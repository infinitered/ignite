import { Image as ExpoImage, type ImageProps as ExpoImageProps } from 'expo-image';
import { forwardRef } from 'react';

export type ImageProps = ExpoImageProps & { className?: string };

/**
 * App-wide Image primitive. Wraps `expo-image` for caching, blurhash
 * placeholders, and fade transitions. NEVER import RN's `Image` directly.
 *
 * Provide a `placeholder` (preferably a blurhash) for any Image that's
 * loading from network — it dramatically improves perceived perf.
 */
export const Image = forwardRef<ExpoImage, ImageProps>(function Image(props, ref) {
  return (
    <ExpoImage
      ref={ref}
      transition={150}
      contentFit="cover"
      cachePolicy="memory-disk"
      {...props}
    />
  );
});
