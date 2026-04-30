## Summary

<!-- 1–3 bullets: what changed and why. Link issue if any. -->

- Issue: <!-- e.g., "fixes #123" -->

## Changes

<!-- High-level list of file/area changes (don't list every line). -->

## Why

<!-- The motivation. What problem does this solve? -->

## Screenshots / Video

| Before | After |
| ------ | ----- |
|        |       |

<!-- For UI changes: include both iOS and Android. Use <img width="300" /> if auto-preview is too large. -->

## Test plan

- [ ] `pnpm before-pr` (lint + typecheck + tests) green
- [ ] Manual smoke on iOS
- [ ] Manual smoke on Android
- [ ] All four UI states checked (loading, empty, error, populated) for any new screen
- [ ] a11y: VoiceOver / TalkBack pass on changed flows
- [ ] If a new dep was added: bundle-size delta documented below

## Bundle size delta

<!-- Output of `pnpm bundle:analyze`. Required if a dep was added/upgraded. -->

## Sentry / PostHog impact

<!-- New tracked events? Breaking event-name changes? Sentry release notes? -->

## ADR link

<!-- If this change involves a foundational decision, link the ADR in docs/decisions/. -->

## Checklist

- [ ] Conventional Commits format on all commits
- [ ] No raw `react-native` `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` imports
- [ ] No raw `axios` / `fetch` outside `app/lib/api.ts`
- [ ] Theme tokens used (no hex / spacing literals)
- [ ] All user-visible strings via `translate()` / `tx`
- [ ] Every interactive control has `accessibilityLabel`
- [ ] `docs/` updated if conventions or architecture changed
