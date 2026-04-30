import { FlashList } from '@shopify/flash-list';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'react-native-css-interop';

/**
 * NativeWind requires `cssInterop` to teach third-party components how to
 * accept a `className` prop. Run this once at module load (imported from
 * `app.tsx`) — afterwards, `<FlashList className="..." />` etc. just works.
 */
cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

cssInterop(ExpoImage, {
  className: 'style',
});

export {};
