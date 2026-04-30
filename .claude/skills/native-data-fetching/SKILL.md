---
name: native-data-fetching
description: TanStack Query patterns — queryKeys, mutations, optimistic, infinite, cache invalidation, offline
priority: critical
---

# Native data fetching

## When to apply

- Adding a new server-data screen
- Implementing mutations with optimistic UI
- Pagination / infinite scroll
- Offline support
- Auth-token refresh
- Cache eviction / invalidation

## Architecture

```
Screen
  └─ uses → query hook (usePosts) in app/queries/
              └─ wraps → useQuery() with queryFn calling…
                          └─ service function (postsService.list) in app/services/{domain}/
                                └─ wraps → @/lib/api (axios) with Zod schema
                                            └─ HTTPS → backend
```

Each layer has one responsibility. Don't bypass — calling axios from a hook directly is a smell.

## Query key factory pattern

```ts
// app/queries/usePosts.ts
export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: ({ signal }) => getValidated('/posts', PostsSchema, { signal }),
  });
}
```

Why factories: invalidation by prefix → `queryClient.invalidateQueries({ queryKey: postKeys.all })` invalidates list AND detail.

## Mutations

```ts
export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePostInput) => postsService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
    },
  });
}
```

### Optimistic updates

```ts
useMutation({
  mutationFn: postsService.update,
  onMutate: async (newPost) => {
    await queryClient.cancelQueries({ queryKey: postKeys.detail(newPost.id) });
    const prev = queryClient.getQueryData<Post>(postKeys.detail(newPost.id));
    queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
    return { prev };
  },
  onError: (_err, newPost, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(postKeys.detail(newPost.id), ctx.prev);
  },
  onSettled: (_, __, newPost) => {
    queryClient.invalidateQueries({ queryKey: postKeys.detail(newPost.id) });
  },
});
```

## Infinite queries

```ts
export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: postKeys.list(),
    queryFn: ({ pageParam, signal }) =>
      getValidated(`/posts?cursor=${pageParam}`, PostPageSchema, { signal }),
    initialPageParam: '',
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
}
```

Render with `<ListView data={pages.flatMap(p => p.items)} onEndReached={() => fetchNextPage()} />`.

## Suspense vs `enabled`

- **`enabled: condition`** — preferred. The hook returns `{ isPending, data, … }` — handle states explicitly with `<LoadingState />`.
- **Suspense** — only when you have a parent `<Suspense fallback={…}>` boundary. Currently unused in this starter.

## Defaults set in `app/lib/queryClient.ts`

- `staleTime: 60_000` — 1 min before refetching
- `gcTime: 5 * 60_000` — 5 min before unused queries are GC'd
- `retry: 2` with exponential backoff
- `refetchOnWindowFocus: false` — mobile apps refocus often; refetching every time wastes data
- `refetchOnReconnect: true` — when NetInfo reports online again, refetch stale queries

Override per-hook only when you must.

## Offline strategy

- TanStack Query natively pauses fetches when offline (via `onlineManager`). Plug `@react-native-community/netinfo` into `onlineManager` in `app.tsx`:
  ```ts
  onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((state) => setOnline(Boolean(state.isConnected))));
  ```
- For "show last good data when offline" UX: rely on `gcTime` (don't evict for 5 min). Combined with `OfflineBanner` for transparency.
- For full offline support (read + write while disconnected): use a persisted query cache with `@tanstack/react-query-persist-client` + MMKV adapter. Out of scope for this starter; document per-project.

## Auth token refresh

The axios `api` instance already injects `Authorization` from SecureStore. For automatic refresh on 401:

1. Add a response interceptor in `app/lib/api.ts` that catches 401, calls `refreshToken()`, retries the original request once.
2. Or use a "session" middleware: if `signOut()` is triggered, call `queryClient.clear()` to drop all cached data.

## Common mistakes

- ❌ Mirroring server data in Zustand. The cache lives in TanStack Query — that's its job.
- ❌ Not using a query key factory → invalidation becomes brittle.
- ❌ Forgetting to pass `signal` to the fetcher → cancelled queries keep running, wasting bandwidth.
- ❌ `setQueryData` without invalidating → stale UI.

## References

- `references/optimistic-recipes.md`
- `references/offline-strategies.md`
- `references/auth-refresh.md`
