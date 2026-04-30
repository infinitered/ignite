import { FlashList, type FlashListProps } from '@shopify/flash-list';

/**
 * App-wide list primitive. Wraps `@shopify/flash-list` (cell-recycling,
 * ~10× faster than FlatList for >50 items). NEVER import RN's `FlatList`
 * directly.
 *
 * `estimatedItemSize` is required for optimal perf — measure or estimate
 * the most common row height in pixels.
 */
export function ListView<T>(props: FlashListProps<T>) {
  return <FlashList<T> {...props} />;
}
