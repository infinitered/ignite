---
description: Generate a Conventional-Commits PR title + body from the current branch's diff
---

# /pr — generate PR title and body

Goal: produce a polished pull-request title and body without me writing it. Save outputs to `.cursor/PR_TITLE` and `.cursor/PR_DRAFT.md` (gitignored).

## Steps

1. Run `git status` and `git diff origin/main...HEAD` to gather the diff.
2. Read `git log origin/main..HEAD --oneline` for commit context.
3. Categorize the change(s): `feat | fix | refactor | perf | docs | test | chore | ci | build`. Pick the most prominent.
4. Generate a **Conventional-Commits title** under 72 chars:
   - `type(scope): description`
   - scope ∈ `screen | store | query | nav | theme | i18n | infra | docs | deps | ci | api | components | …`
   - imperative mood, no trailing period.
5. Generate the **body** with these sections:
   - **Summary** — 1–3 bullets, "what changed and why".
   - **Changes** — bullet list of notable file/area changes (don't list every line).
   - **Impact** — user-visible behavior, perf delta, bundle size delta if a dep was added/removed.
   - **Testing** — markdown checklist:
     - [ ] `pnpm before-pr` (lint + typecheck + tests)
     - [ ] Manual smoke on iOS + Android
     - [ ] All four UI states checked (loading, empty, error, populated) for any new screen
     - [ ] a11y: VoiceOver pass on changed flows
   - **Screenshots** — placeholder section noting iOS + Android screenshots.
   - **Sentry / PostHog impact** — any new tracked events or breaking event-name changes.
   - **ADR link** (optional) — if the change involves a foundational decision.

## Output

- Write the title to `.cursor/PR_TITLE`.
- Write the body to `.cursor/PR_DRAFT.md`.
- Print both to chat for review.
- Suggest the `gh pr create` command using both files (`gh pr create --title "$(cat .cursor/PR_TITLE)" --body-file .cursor/PR_DRAFT.md`).
