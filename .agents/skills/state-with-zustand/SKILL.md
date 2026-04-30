---
name: state-with-zustand
description: Zustand patterns — slice composition, MMKV persist vs SecureStore, selectors, TS inference
priority: high
---

# State with Zustand

## When to apply

- Adding UI / ephemeral state (form drafts, modals, current step, theme override)
- Persisting non-secret prefs across launches
- Storing auth session info (token + isHydrated flag)
- Composing multiple slices into one store

## Decision tree: Zustand vs TanStack Query

| Data type | Tool |
|---|---|
| Server data (lists, details fetched from API) | **TanStack Query** |
| Client UI state (modal open, current step, form draft) | **Zustand** (no persist) |
| Persisted user preference (theme, language, last-viewed) | **Zustand + MMKV persist** |
| Auth tokens / secrets | **`useSessionStore` + expo-secure-store** (NOT MMKV) |

NEVER mirror server data into Zustand — that's where bugs live.

## Slice pattern

```ts
// app/stores/usePrefsStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@/lib/storage';

type State = { colorScheme: 'light'|'dark'|'system'; counter: number };
type Actions = {
  setColorScheme: (s: State['colorScheme']) => void;
  increment: () => void;
};

export const usePrefsStore = create<State & Actions>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      counter: 0,
      setColorScheme: (colorScheme) => set({ colorScheme }),
      increment: () => set((s) => ({ counter: s.counter + 1 })),
    }),
    { name: 'app.prefs', storage: createJSONStorage(() => zustandMMKVStorage), version: 1 }
  )
);
```

## Persistence options

### MMKV (`zustandMMKVStorage` adapter)

- Sync, mmap-backed, ~30× faster than AsyncStorage.
- For non-secret data that should outlive the app launch.
- Already wired in `app/lib/storage.ts`.

### SecureStore (manual, NOT a persist middleware)

- Async, encrypted, slow.
- For SECRETS only.
- Use a non-persisted store + bootstrap pattern (see `useSessionStore`):
  ```ts
  bootstrap: async () => {
    const token = await getAuthToken();   // from expo-secure-store
    set({ token, isHydrated: true });
  }
  ```
- Call `bootstrap()` once on app launch (in `app.tsx`).

### Mixed: persisted + secret

Split into TWO stores:
- `usePrefsStore` — Zustand + MMKV persist for non-secret state.
- `useSessionStore` — Zustand without persist; tokens live in SecureStore.

NEVER combine. NEVER persist secrets via MMKV.

## Selectors (re-render hygiene)

```ts
// ❌ Re-renders every state change anywhere in the store
const { count } = useStore();

// ✅ Re-renders only when count changes
const count = useStore((s) => s.count);

// ✅ Multiple values, shallow-compared (no extra renders for unrelated changes)
import { useShallow } from 'zustand/react/shallow';
const { count, name } = useStore(useShallow((s) => ({ count: s.count, name: s.name })));
```

## Action grouping for complex stores

Compose with slices when one store gets > ~150 lines:

```ts
type CounterSlice = { count: number; inc: () => void };
const createCounterSlice: StateCreator<CounterSlice> = (set) => ({
  count: 0, inc: () => set((s) => ({ count: s.count + 1 })),
});
type ProfileSlice = { name: string; setName: (n: string) => void };
const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  name: '', setName: (name) => set({ name }),
});

export const useStore = create<CounterSlice & ProfileSlice>()((...a) => ({
  ...createCounterSlice(...a),
  ...createProfileSlice(...a),
}));
```

## TypeScript tips

- Always type the create call: `create<State & Actions>()(…)` so action signatures infer correctly.
- For persisted stores, declare a `version` and write a `migrate` function if the schema changes.
- Avoid storing functions in state — only data.

## Common mistakes

- ❌ Persisting auth tokens via MMKV — use SecureStore.
- ❌ Using `useStore()` without a selector → all consumers re-render on any state change.
- ❌ Reading store state inside `useEffect` deps → stale closures. Subscribe via the hook instead.
- ❌ Mutating state directly → use `set((s) => …)` always.
- ❌ Mirroring server state from TanStack Query into Zustand → drift bugs.

## Testing

- Reset store between tests: in `beforeEach`, call `useStore.setState(initialState, true)` (the `true` flag replaces).
- For persisted stores, mock MMKV (already done in `test/setup.ts`).

## References

- `references/persistence-recipes.md` — version migrations, partial persist
- `references/multi-slice-composition.md` — large-store organization
