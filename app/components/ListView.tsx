import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { forwardRef } from 'react';

/**
 * App-wide list primitive. Wraps `@shopify/flash-list` (cell-recycling,
 * ~10× faster than FlatList for >50 items). NEVER import RN's `FlatList`
 * directly.
 *
 * `estimatedItemSize` is required for optimal perf — measure or estimate
 * the most common row height in pixels.
 */
export const ListView = forwardRef<FlashList<unknown>, FlashListProps<unknown>>(function ListView(
  props,
  ref
) {
  return <FlashList ref={ref} {...props} />;
}) as <T>(props: FlashListProps<T> & { ref?: React.Ref<FlashList<T>> }) => React.ReactElement;
