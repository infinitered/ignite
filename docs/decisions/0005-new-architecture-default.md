# ADR 0005: New Architecture (Fabric + TurboModules) on by default

- **Status**: Accepted
- **Date**: 2026-04-30

## Context

React Native's New Architecture (Fabric renderer + TurboModules) was experimental for years and became the default in RN 0.76+. As of Expo SDK 55 / RN 0.83, it's stable enough for production for most apps.

Two paths:
- Keep the old architecture (legacy bridge) for safety.
- Adopt the new architecture and pay any migration tax up front.

## Decision

**New Architecture is ON by default.** `app.json` `newArchEnabled: true`. Hermes engine ON for both platforms. ProGuard ON for Android release builds (`expo-build-properties` plugin).

Native modules added to the project must be Fabric-compatible — verified via `react-native-directory.com` before adoption.

## Consequences

### Positive

- Better perf: Fabric eliminates the legacy bridge, enabling synchronous layout reads + writes.
- Smaller memory footprint: TurboModules lazy-load on first use.
- Type safety: TurboModule codegen produces TS types matching the native interface.
- Future-proof: most new RN libraries target Fabric first; legacy bridge is on a deprecation curve.
- Hermes bytecode: faster startup + light obfuscation of the JS bundle.

### Negative / trade-offs

- Some older / niche native modules don't yet support Fabric. Each new dep must be checked. Mitigated by `react-native-directory.com` filter and our dep-upgrader subagent.
- Subtle behavior differences from the legacy bridge — particularly around layout timing and `findNodeHandle`. Edge cases need testing.
- `useFrameworks: 'static'` on iOS produces larger initial binary (vs dynamic frameworks) but faster startup.

### Neutral

- Hermes is the only supported engine for the New Architecture. Already our default.

## Alternatives considered

### A. Legacy bridge (status quo)

- Pros: Maximum compatibility with old native modules.
- Cons: Deprecated path; we'd be choosing slow demise.
- Verdict: rejected.

### B. Adopt New Architecture but document an opt-out

- Pros: Escape hatch for projects that hit a blocker.
- Cons: Two configurations to support; ambiguity invites drift.
- Verdict: rejected. If a project hits a blocker, they ship an ADR overriding this one.

## Notes / follow-ups

- Track Fabric compatibility for our locked-in native deps (Reanimated, Gesture Handler, Safe Area Context, etc.) on each Expo SDK upgrade.
- If `react-native-mmkv` or another core dep ever loses Fabric support, this ADR gets revisited urgently.
