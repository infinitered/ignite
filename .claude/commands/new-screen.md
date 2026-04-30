---
description: Scaffold a new screen via the generator + add nav entry + open the file.
---

# /new-screen <Name>

1. Run `pnpm gen screen <Name>` — creates `app/screens/{kebab}/{Name}Screen.tsx` plus a co-located test from `templates/screen/`.
2. Open the generated file.
3. Add the screen to `app/navigators/AppNavigator.tsx`:
   ```tsx
   <Stack.Screen name="{Name}" component={{Name}Screen} />
   ```
4. Add the route to `AppStackParamList` in `app/navigators/navigationTypes.ts`:
   ```ts
   {Name}: undefined;  // or { id: string } if it takes params
   ```
5. Add an i18n key namespace in `app/i18n/en.ts`:
   ```ts
   {camelName}: { title: '{Name}' }
   ```
6. Verify: `pnpm typecheck && pnpm lint`.

Reminder: the screen MUST handle all four UI states (loading, empty, error, populated) and use only `@/components/*` primitives — Biome will reject raw RN.
