---
name: forms-with-rhf-zod
description: React Hook Form + Zod patterns — schema-first design, Controller for RN inputs, async validation
priority: high
---

# Forms with RHF + Zod

## When to apply

- Any form in the app: login, sign-up, profile edit, search filters, settings.
- Multi-step wizards.
- Async validation (e.g., username availability check).

## Schema-first design

The Zod schema is the source of truth: it generates the TS type, validates input, and (often) parses backend responses.

```ts
// app/schemas/profile.ts
import { z } from 'zod';

export const ProfileSchema = z.object({
  email: z.string().email('errors.invalidEmail'),
  fullName: z.string().min(1, 'errors.required'),
  bio: z.string().max(280).optional(),
});
export type ProfileInput = z.infer<typeof ProfileSchema>;
```

Notes:
- Error messages are i18n keys. Resolve with `translate(error.message)` at render time.
- Export the schema — tests use it for fixtures, services use it for response validation.

## Hook setup

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, type ProfileInput } from '@/schemas/profile';

export function ProfileForm() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { email: '', fullName: '' },
  });

  const onSubmit = async (values: ProfileInput) => {
    await profileService.update(values);
  };

  return (
    <Controller
      control={control}
      name="email"
      render={({ field, fieldState }) => (
        <TextField
          label={translate('profile.email')}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error ? translate(fieldState.error.message as TxKeyPath) : undefined}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      )}
    />
    // …
  );
}
```

## Controller wrappers for RN inputs

`<TextField />` already plays well with `Controller`. For other inputs, the Controller pattern is:

```tsx
<Controller
  control={control}
  name="acceptTerms"
  render={({ field, fieldState }) => (
    <Switch value={field.value} onValueChange={field.onChange} accessibilityLabel="..." />
  )}
/>
```

Always pass `field.onChange` to the input's onChange-equivalent prop. Don't `setValue` manually unless you have a strong reason — RHF will lose track.

## Async validation

```ts
const schema = z.object({
  username: z.string().min(3).refine(
    async (val) => {
      const { available } = await usernameService.check(val);
      return available;
    },
    { message: 'errors.usernameTaken' }
  ),
});

useForm<{ username: string }>({
  resolver: zodResolver(schema),
  mode: 'onBlur',  // validate on blur to avoid an API call per keystroke
});
```

For very expensive validation, debounce inside `refine` or trigger validation manually with `form.trigger('username')`.

## Validation modes

- **`mode: 'onSubmit'`** (default) — least intrusive; only validates on submit.
- **`mode: 'onBlur'`** — validates each field when it loses focus. Good for async fields.
- **`mode: 'onChange'`** — validates on every keystroke. Use sparingly; expensive.
- **`mode: 'all'`** — validates on every event. Almost never the right answer.

`reValidateMode: 'onChange'` after first submit attempt is usually what users want.

## Multi-step wizards

```ts
const stepSchemas = [
  z.object({ email: z.string().email() }),
  z.object({ password: z.string().min(8) }),
];
const FullSchema = stepSchemas.reduce((a, b) => a.merge(b));
const form = useForm({ resolver: zodResolver(FullSchema) });

async function next() {
  const ok = await form.trigger(Object.keys(stepSchemas[step].shape) as Array<keyof FormData>);
  if (ok) setStep((s) => s + 1);
}
```

## Error rendering

- `<TextField />` renders the error in destructive color and announces it via `accessibilityLiveRegion="polite"`.
- For form-level errors (e.g., backend returned 422), use a banner + `setError('root', { message: '...' })`.
- NEVER render error messages in `Alert.alert()` for form validation — disorients users.

## Testing forms

- Import the Zod schema and assert boundary cases:
  ```ts
  expect(ProfileSchema.safeParse({ email: '' }).success).toBe(false);
  ```
- Render the form with `renderWithProviders`, type into fields with `fireEvent.changeText`, press submit, assert.
- Mock the service at the network boundary (MSW), not the hook.

## Common mistakes

- ❌ `setValue` instead of `field.onChange` — RHF state goes stale.
- ❌ `Controller` outside the form — hook violations / "controller used outside provider".
- ❌ Schema definitions co-located with the screen — extract to `app/schemas/` so multiple files (service, tests, screen) can import.
- ❌ Hardcoded English error strings — use i18n keys.
- ❌ Validating before user interaction → noisy. Use `mode: 'onSubmit'` or `'onBlur'`.

## References

- `references/multi-step-recipe.md`
- `references/async-validation.md`
- `references/dynamic-fields.md` — `useFieldArray` patterns
