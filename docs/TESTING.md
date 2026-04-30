# Testing

> Jest + RTL + MSW + Maestro. Rules: `.cursor/rules/testing.mdc`. Skill: `e2e-testing-patterns`.

## What you get out of the box

- **Jest 29** with `jest-expo` preset (handles RN Babel transforms).
- **`@testing-library/react-native`** for component tests + accessible queries.
- **MSW** for HTTP mocking at the network boundary.
- **Native module mocks** in `test/setup.ts` (MMKV, expo-secure-store).
- **Maestro** YAML flows in `.maestro/` for E2E.

## What lives where

```
test/
├── setup.ts                # global setup; native module mocks
├── msw/
│   ├── handlers.ts         # MSW request handlers (per-domain)
│   └── server.ts           # node MSW server (call setupServer in setup.ts)
└── utils/
    └── renderWithProviders.tsx   # render helper that wraps QueryClient + SafeArea + NavContainer

app/<feature>/
├── Foo.tsx
└── Foo.test.tsx            # co-located test
```

(Initial scaffolding for `test/msw/` is not yet generated — add per-project as you grow.)

## Mock at the network boundary only

This is the rule that matters most. We use **MSW** to intercept fetch / axios at the network layer (axios uses XMLHttpRequest under the hood, which MSW v2 patches automatically).

```ts
// test/msw/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/posts', () => {
    return HttpResponse.json([{ id: 1, title: 'Hello' }]);
  }),
];
```

```ts
// test/msw/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```ts
// test/setup.ts
import { server } from './msw/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**NEVER** `jest.mock('@/lib/api')` or `jest.mock('@/queries/usePosts')` — that hides regressions. The whole point of testing the real `api` instance is to catch interceptor bugs.

## Render with providers

```tsx
// test/utils/renderWithProviders.tsx
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return render(
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{ui}</NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>,
    options
  );
}
```

Use it everywhere. Bare `render(<Foo />)` diverges from production.

## What to test

### One user-flow test per screen (minimum)

```tsx
import { renderWithProviders } from '@/../test/utils/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react-native';

import { ProfileScreen } from './ProfileScreen';

describe('ProfileScreen', () => {
  it('lets the user submit their email', async () => {
    renderWithProviders(<ProfileScreen route={…} navigation={…} />);

    fireEvent.changeText(screen.getByLabelText('Email'), 'a@b.co');
    fireEvent.press(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/form submitted/i)).toBeOnTheScreen();
  });
});
```

### Schema boundary tests

Forms / API responses validated by Zod → assert on the schema directly:

```ts
import { ProfileSchema } from '@/schemas/profile';

it('rejects empty email', () => {
  expect(ProfileSchema.safeParse({ email: '' }).success).toBe(false);
});
```

### Hook tests

For non-trivial hooks, `renderHook` from `@testing-library/react-native`.

## What NOT to test

- Library code (TanStack Query, Zustand) — trust the maintainers.
- Implementation details (internal state, `useState` calls).
- Component snapshots over 30 lines — they become noise.
- Visual regressions via JS snapshots — use a real visual diff tool (Chromatic via Storybook, or Percy) per project.

## Accessibility queries first

Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`. They double as a11y audit — if a test can't find an element by label, neither can VoiceOver.

```tsx
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');
```

`getByTestId` only when no accessible alternative exists. If you use it, also add an `accessibilityLabel`.

## Coverage targets

- Floor: **60% lines** repo-wide.
- PR gate: **70% lines on changed files** (configure once you have `--changedSince` in CI).
- 100% coverage is not the goal. Meaningful behavior coverage is.

```bash
pnpm test:coverage
```

Coverage reports upload to Codecov in CI.

## E2E (Maestro)

Flows in `.maestro/flows/`. Tagged: `smoke`, `a11y`, `regression`. Run subsets:

```bash
maestro test --include-tags smoke .maestro/flows
```

CI:
- PR builds: smoke flows (~2 min).
- Nightly: full suite + a11y on Maestro Cloud.

Selector rules:
- Use `accessibilityLabel`-based selectors (i18n-resilient).
- Avoid raw text selectors (break with locale changes).
- Avoid `testID` unless no a11y alternative.

Test data via env (`MAESTRO_TEST_USER_EMAIL`, etc.) — never check in real credentials.

## Visual regression

Out of scope for this starter. If your design system matters: add Storybook + Chromatic per-project. Document the choice as an ADR.

## Performance regression

Out of scope. Add `flashlight-tools` (or similar) per-project if you ship to large user bases. Document as an ADR.
