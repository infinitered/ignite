# Test Folder

Ignite includes support for writing [Jest](https://jestjs.io/) tests, which can be located anywhere in your codebase. But the initial Jest setup, mocking objects for testing, and any global scoped tests belong in the `test` directory.

### i18n.test.ts

`test/i18n.test.ts` is a handy test to check for any missing or mistyped translation keys in your app.
It searches the codebase for components using the `tx=""` prop, or any `translate("")` commands, and checks for a valid i18n key between the double quotes.

This approach isn't 100% perfect. If you are storing your key string in a variable because you are setting it conditionally, then it won't be picked up.
