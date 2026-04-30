# Components

> Reference for the primitives shipped in `app/components/`. Built on NativeWind v4 + `tailwind-variants`. **NEVER import `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` from `react-native`.** Biome blocks the violations.

## `<Text>`

```tsx
<Text variant="display" tx="example.title" />
<Text variant="body" tone="muted">Static text</Text>
<Text variant="caption" align="center" tone="destructive">Error!</Text>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'display' \| 'heading-1' \| 'heading-2' \| 'heading-3' \| 'heading-4' \| 'body' \| 'body-bold' \| 'caption' \| 'code'` | `'body'` | Type scale from `tailwind.config.js` |
| `tone` | `'default' \| 'muted' \| 'primary' \| 'destructive' \| 'success'` | `'default'` | Semantic color |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | |
| `tx` | i18n key | — | Preferred over `text`/`children` for any user-visible string |
| `text` | string | — | Fallback for non-translatable strings (counters, etc.) |
| `className` | string | — | Tailwind utilities; merged via `tailwind-variants` |

Plus all `react-native` `TextProps` (`numberOfLines`, `selectable`, etc.).

## `<Button>`

```tsx
<Button
  variant="primary"
  size="md"
  loading={isSubmitting}
  onPress={handleSubmit}
  tx="form.submit"
  accessibilityLabel="Submit form"
/>
```

`accessibilityLabel` is **required** (TS-enforced). Renders an `ActivityIndicator` when `loading`.

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | boolean | `false` |
| `disabled` | boolean | `false` |
| `tx` / `text` / `children` | i18n key / string / ReactNode | — |
| `accessibilityLabel` | string | **required** |

## `<TextField>`

Designed to plug into `react-hook-form`'s `<Controller>`:

```tsx
<Controller
  control={control}
  name="email"
  render={({ field, fieldState }) => (
    <TextField
      label={translate('form.email')}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
      keyboardType="email-address"
      autoCapitalize="none"
    />
  )}
/>
```

Sets `aria-invalid` when `error` is provided. Error text is in `accessibilityLiveRegion="polite"` for screen-reader announcement.

| Prop | Type |
|---|---|
| `labelTx` / `label` | i18n key / string |
| `helperTx` / `helper` | i18n key / string |
| `error` | string (from RHF `fieldState.error?.message`) |
| All `TextInputProps` | including `value`, `onChangeText`, `onBlur` |

## `<Screen>`

Wraps SafeAreaView + KeyboardAvoiding + scroll modes.

```tsx
<Screen preset="scroll-keyboard" contentClassName="p-4 gap-4">
  {children}
</Screen>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `preset` | `'fixed' \| 'scroll' \| 'scroll-keyboard'` | `'fixed'` | Pick `scroll-keyboard` for forms |
| `safeAreaEdges` | `('top' \| 'bottom' \| 'left' \| 'right')[]` | `['top', 'bottom']` | |
| `statusBarStyle` | `'auto' \| 'light' \| 'dark'` | `'auto'` | |
| `keyboardOffset` | number | `0` | iOS keyboard avoidance |
| `className` | string | — | Outer container |
| `contentClassName` | string | — | Inner content |

## `<Card>`

```tsx
<Card>...</Card>
<Card onPress={handlePress} accessibilityLabel="Open settings" elevation="raised">...</Card>
```

If `onPress` is provided, the card becomes accessible as a button (`accessibilityLabel` strongly recommended).

## `<Icon>`

Wraps `@expo/vector-icons` Ionicons with NativeWind className support for color (`text-primary`, `text-muted-foreground`, …).

```tsx
<Icon name="heart" size={20} className="text-primary" />
<Icon name="heart" accessibilityLabel="Favorite" />  // non-decorative
```

Defaults to decorative (`accessibilityElementsHidden`); pass `accessibilityLabel` to make it announced.

## `<Image>`

Wraps `expo-image` for caching, blurhash placeholders, and fade transitions. **Always pass `placeholder` for network images.**

```tsx
<Image
  source={{ uri: post.thumbnail }}
  placeholder={{ blurhash: post.blurhash }}
  className="w-full h-40 rounded-md"
  contentFit="cover"
/>
```

| Default | Value |
|---|---|
| `transition` | `150` ms |
| `contentFit` | `'cover'` |
| `cachePolicy` | `'memory-disk'` |

## `<ListView>`

Wraps `@shopify/flash-list`. **`estimatedItemSize` is required.** Use for any list > 30 items.

```tsx
<ListView
  data={posts}
  keyExtractor={(item) => String(item.id)}
  estimatedItemSize={80}
  renderItem={renderPost}
/>
```

For heterogeneous items, pass `getItemType` to keep recycling efficient.

## `<OfflineBanner>`

Mount once at the root of `AppNavigator`. Auto-shows when device is offline; auto-hides when connectivity returns.

```tsx
<View>
  <OfflineBanner />
  <Stack.Navigator>...</Stack.Navigator>
</View>
```

## `<LoadingState>`, `<EmptyState>`, `<ErrorState>`

The three "non-populated" UI states. Every screen handles all four (loading, empty, error, populated).

```tsx
{posts.isPending  ? <LoadingState message="Loading posts…" />
 : posts.isError  ? <ErrorState message={posts.error.message} onRetry={() => posts.refetch()} />
 : posts.data.length === 0 ? <EmptyState headingTx="posts.empty.heading" contentTx="posts.empty.content" />
 : <ListView data={posts.data} … />}
```

`<EmptyState>` accepts an optional CTA (`buttonTx` + `onButtonPress`).

## Adding a new primitive

1. `pnpm gen component MyPrimitive` — produces `app/components/MyPrimitive.tsx` + test from the template.
2. Use `tv()` for any component with > 2 visual states.
3. If wrapping a third-party component: add a `cssInterop` entry in `app/lib/cssInterop.ts`.
4. Export with named exports only.
5. Document the prop API in this file.

Reminder: keep primitives **business-logic-free**. Anything that talks to a store, query, or service belongs in a screen-local component, not a primitive.
