---
name: typescript-advanced-types
description: Branded types, exhaustive switches, satisfies, route param typing, Zod-derived types
priority: medium
---

# TypeScript advanced types

## When to apply

- Designing an API surface (a service or a hook public type)
- Writing a generic utility (e.g., a query key factory)
- Modeling state machines / discriminated unions
- Catching whole categories of bugs at compile time

## Branded types — primitive obsession killer

```ts
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

declare function fetchUser(id: UserId): Promise<User>;
const u: UserId = 'u_123' as UserId;       // explicit cast
fetchUser('p_456' as PostId);              // ❌ TS error — can't pass PostId
```

Use brands to distinguish IDs that are structurally identical (both strings) but semantically different. Catches "passed userId where I meant postId" bugs.

For runtime branding (validates at the boundary): pair with Zod:
```ts
const UserId = z.string().brand<'UserId'>();
type UserId = z.infer<typeof UserId>;
const u = UserId.parse('u_123');           // throws if invalid
```

## Exhaustive switches via `never`

```ts
type Status = 'pending' | 'success' | 'error';

function describe(status: Status): string {
  switch (status) {
    case 'pending': return 'Loading';
    case 'success': return 'Done';
    case 'error':   return 'Failed';
    default:
      const _exhaustive: never = status;   // compile error if a case is missing
      throw new Error(`Unhandled status: ${_exhaustive}`);
  }
}
```

Adding a new variant to `Status` causes a compile error here, forcing you to handle it.

## `satisfies` — type-check a literal without widening

```ts
const routes = {
  home: { path: '/' },
  profile: { path: '/profile/:id' },
} satisfies Record<string, { path: string }>;

routes.profile.path;     // type is the literal '/profile/:id', not `string`
```

Use when you want both validation against a constraint AND preserving narrow inferred types.

## Discriminated unions for hook return types

```ts
type QueryResult<T> =
  | { status: 'pending'; data: undefined }
  | { status: 'success'; data: T }
  | { status: 'error'; data: undefined; error: Error };

const result: QueryResult<User> = useFoo();
if (result.status === 'success') {
  result.data.name;     // narrowed; data is User
}
```

TanStack Query already gives you this shape via `isPending` / `isSuccess` / `isError`. Use the discriminated narrowing in your screens — never reach into `data` before checking the status flag.

## Route param typing

```ts
// app/navigators/navigationTypes.ts
export type AppStackParamList = {
  Example: undefined;
  Profile: { id: string };
  Post: { postId: number; from?: string };
};

// In a screen
import type { AppStackScreenProps } from '@/navigators/navigationTypes';
type Props = AppStackScreenProps<'Profile'>;
export function ProfileScreen({ route }: Props) {
  route.params.id;     // typed as string
}
```

Generated screens inherit this typing from the template.

## Zod-derived types

```ts
// app/schemas/post.ts
export const Post = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
export type Post = z.infer<typeof Post>;
```

The schema and the type are co-located and never drift. Service layer uses the schema for validation; UI uses the type. **Don't write a parallel TS interface — that's how drift happens.**

## Narrowing helpers

```ts
function isDefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}

const filtered = mixedArray.filter(isDefined);   // T[], not (T|null|undefined)[]
```

## `noUncheckedIndexedAccess` realities

We have this on. Implications:

```ts
const arr = [1, 2, 3];
const first = arr[0];          // type: number | undefined
if (first !== undefined) {
  // first is number
}
```

This catches off-by-one errors. Embrace it — don't `!` your way out unless you've genuinely guarded.

## Common mistakes

- ❌ `as any` — defeats the purpose. Reach for `unknown` and narrow.
- ❌ `as T` to silence errors — usually masks a bug. Add a runtime check or use a Zod schema.
- ❌ Manual TS interfaces parallel to a Zod schema — they drift.
- ❌ Optional chaining everywhere (`x?.y?.z`) — often a sign you should narrow earlier.
- ❌ `// @ts-ignore` — leaves a landmine. Use `// @ts-expect-error` with a comment about why.

## References

- `references/branded-types-cookbook.md`
- `references/discriminated-unions.md`
- `references/zod-as-type-source.md`
