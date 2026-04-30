# ADR 0002: Zustand + TanStack Query (server vs client state split)

- **Status**: Accepted
- **Date**: 2026-04-30

## Context

The forked Ignite template ships with MobX-State-Tree + Apisauce. MST is opinionated, learnable, and battle-tested — but few engineers know it today, the API is unusual to JS devs, and it conflates server cache with client state. Apisauce wraps axios with retry/timeout helpers that overlap with what TanStack Query provides natively.

Modern RN apps overwhelmingly use a state tool + a data-fetching tool, with strict separation between the two:
- **Server state**: data owned by a remote system. Has staleness, cache, refetch semantics.
- **Client state**: ephemeral UI state, persisted prefs, in-progress flows.

Treating these as one (with MST or Redux) tends to produce mirror-bugs (the cached server data drifts from what the server holds).

## Decision

- **Zustand** for client state (UI, ephemeral, persisted prefs, auth session).
- **TanStack Query** for server state (any data fetched from a backend).
- These are kept strictly separate. **NEVER mirror server data into Zustand.**

## Consequences

### Positive

- Smaller learning curve than MST (Zustand is "just a hook").
- TanStack Query handles retries, refetch, optimistic updates, infinite scroll, offline pause out of the box.
- Clear architectural boundary: if it came from a backend, it's a query; if it's UI state, it's a store.
- Both libraries are lightweight (~3 KB each gzipped vs MST ~15 KB).
- Excellent TypeScript inference in both.

### Negative / trade-offs

- Engineers used to MST or Redux must learn TanStack Query's mental model (mutations, queryKey factories, invalidation).
- Two libraries to keep updated rather than one.
- "Where does this state belong?" is a new question to answer per feature. We mitigate via the rule "if it came from a backend, it's a query."

### Neutral

- Zustand has many APIs (`create`, `slices`, `combine`, `subscribeWithSelector`); we standardize on the basic `create` + `persist` pattern with selectors. Document the slice pattern as projects grow.

## Alternatives considered

### A. MobX-State-Tree (Ignite default)

- Pros: Battle-tested, opinionated, integrates Reactotron well.
- Cons: Esoteric API for new devs; mixes server cache with client state; heavier bundle; smaller community in 2026.
- Verdict: rejected.

### B. Redux Toolkit + RTK Query

- Pros: Classic, strong devtools, well-known.
- Cons: More boilerplate than Zustand; RTK Query is fine but TanStack Query has a richer feature set (infinite, suspense, devtools UX).
- Verdict: rejected for boilerplate cost.

### C. Jotai / Recoil

- Pros: Atomic state, fine-grained re-renders.
- Cons: Different mental model (atoms) is harder to teach; less mature than Zustand for our scope.
- Verdict: rejected.

### D. TanStack Query alone (no client store)

- Pros: One tool.
- Cons: Doesn't fit ephemeral UI state (modals, current step, etc.). You'd end up with `useState` everywhere or context misuse.
- Verdict: rejected.

## Persistence rules

- Auth tokens / secrets → `expo-secure-store` (NOT MMKV-persisted Zustand).
- Non-secret prefs → MMKV-persisted Zustand via `zustandMMKVStorage` adapter.
- Server data → never persisted by us; TanStack Query's in-memory cache is the truth (project-specific persistence via `react-query-persist-client` if offline support is needed).

## Notes / follow-ups

- Document the slice pattern in `state-with-zustand` skill.
- Re-evaluate when TanStack Query Suspense lands stably (currently use `enabled` + `isPending`).
