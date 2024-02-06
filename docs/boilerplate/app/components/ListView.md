---
sidebar_position: 37
---

# ListView

The `ListView` component is a Higher Order Component that uses [Shopify's FlashList](https://shopify.github.io/flash-list/) component to display a list unless the user's preferred language is RTL (right-to-left). This is because FlashList has [known](https://github.com/Shopify/flash-list/issues/544) [issues](https://github.com/Shopify/flash-list/issues/840) with RTL support. Once these issues with FlashList are resolved, this component will be deprecated and FlashList will be used directly.

## Props

The `ListView` component uses props from `FlashList` because they are a superset of `FlatList` and only require one extra prop to work for both component types.

> [Please see the FlashList documentation for more information on the props that are available.](https://shopify.github.io/flash-list/docs/usage)

### `estimatedItemSize`

> [Please see the FlashList documentation for more information on this prop.](https://shopify.github.io/flash-list/docs/estimated-item-size)
