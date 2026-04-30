# ADR 0004: Biome over ESLint + Prettier

- **Status**: Accepted
- **Date**: 2026-04-30

## Context

The forked Ignite template uses ESLint (with `expo`, `react-native`, `prettier` configs) + Prettier. Two tools, two configs, ~40 dev deps, slow CI runs.

Biome (formerly Rome) ships a single Rust-based binary that does both lint and format. As of v1.9, it covers ~90% of the rules we care about, runs ~10× faster, and has a simpler config surface.

## Decision

**Biome 1.9** replaces ESLint + Prettier entirely. Configuration in `biome.json`. Project rules:
- 2-space indent, 100-char line width, single quotes, ES5 trailing commas.
- `noRestrictedImports` enforces our import bans (raw RN primitives, raw axios/fetch, console outside logger).
- `noUnusedVariables` / `noUnusedImports` as errors.
- `useImportType` / `useExportType` for `verbatimModuleSyntax`.
- Per-file overrides: `app/lib/api.ts` may import axios; `app/lib/logger.ts` may use console; primitives may wrap RN.

## Consequences

### Positive

- ~10× faster lint + format. CI runtime drops from minutes to seconds.
- One config file, one binary, one mental model.
- Removes ~40 dev deps (`eslint*`, `prettier*`, `eslint-config-expo`, `eslint-plugin-react-native`, etc.).
- Consistent format across the team without IDE-specific Prettier config.
- LSP integration (VS Code, Cursor) is native + fast.

### Negative / trade-offs

- Biome's rule set is narrower than ESLint's. We lose some niche rules:
  - `eslint-plugin-react-hooks/exhaustive-deps` — Biome has `useExhaustiveDependencies` (warn level), but historically less strict. Verify per-PR.
  - `eslint-plugin-react-native` rules (e.g., `no-color-literals`) — we replace with `noRestrictedImports` for raw RN primitives + a separate review pass for color literals (Biome's `nursery` is gaining these gradually).
- Biome 1.x has occasional edge cases with TS exotic features (template literal types, deep generics). Rare; usually solvable by simplifying.
- The team must learn Biome's CLI (`biome check`, `biome format`, `biome ci`). Mostly trivial.

### Neutral

- Biome publishes editor extensions for VS Code, JetBrains, Zed. Cursor uses VS Code's automatically.

## Alternatives considered

### A. ESLint flat config + Prettier (status quo, modernized)

- Pros: Battle-tested ecosystem, every rule under the sun.
- Cons: Slow, two configs, frequent plugin churn (e.g., `eslint-plugin-react-hooks` peer-dep mismatches with new ESLint majors).
- Verdict: rejected for perf + simplicity.

### B. dprint

- Pros: Fast, Rust-based, modular plugin system.
- Cons: Format-only; we'd still need a linter (back to ESLint).
- Verdict: rejected.

### C. Oxlint + Prettier

- Pros: Oxlint is even faster than Biome for linting.
- Cons: Less mature than Biome (alpha at time of decision); no built-in format → still need Prettier.
- Verdict: defer; revisit when Oxlint hits 1.0 and ships a formatter.

## Notes / follow-ups

- Track the rules we wish Biome had via a `docs/decisions/biome-rule-gaps.md` file (per-project) and revisit on minor releases.
- If a new project genuinely needs an ESLint-only rule, layer ESLint **only for that rule** alongside Biome — but this is a trapdoor, not a default.
