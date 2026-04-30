---
description: Scaffold a complete feature — store + service + query + screen + nav + i18n + test in one shot.
---

# /new-feature <Name>

The composite generator. Creates everything needed for a typical CRUD-ish feature so the user only has to fill in the schema and the UI.

1. Run `pnpm gen feature <Name>`. Generated files:
   - `app/services/{camel}/{camel}Service.ts` — axios calls per endpoint
   - `app/queries/use{Name}.ts` — TanStack Query hooks + queryKey factory
   - `app/stores/use{Name}Store.ts` — Zustand store (only if the feature has UI state; remove if not needed)
   - `app/screens/{kebab}/{Name}Screen.tsx` — screen wired to query
   - Test file alongside each
   - i18n key namespace appended to `app/i18n/en.ts`
   - Nav entry appended to `app/navigators/AppNavigator.tsx`

2. Customize:
   - Define the Zod response schema in the service file. Replace the placeholder shape.
   - Update the queryKey factory if the resource has nested relationships.
   - Wire the screen UI — handle all four states (loading, empty, error, populated).
   - Translate user-visible strings.

3. Add an MSW handler in `test/msw/handlers.ts` for the new endpoint.

4. Verify:
   ```
   pnpm before-pr   # lint + typecheck + test
   pnpm ios         # boot the screen, exercise it
   ```

Reminder: server state lives in TanStack Query, ephemeral state in Zustand. Don't mirror.
