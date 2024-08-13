---
sidebar_position: 160
---

# Internationalization in Ignite Apps

Ignite currently set up to have Internationalization setup in English, Arabic, Korean, French and Japanese! This is detected on app load and will set your app to that language.

## Right to Left languages (RTL)

Since Ignite already comes with an RTL language, Arabic, adding any new ones would work by default.

### Removing RTL Support

To remove RTL support, follow the following steps:

1. In `/app/i18n/i18n.ts`

- Remove your RTL `.json` file from the `i18n.translations` object
- Remove lines 19-21 where we allow and force RTL on the native layer

2. Remove all other associated logic that uses the exported `isRTL` variable
3. Remove any `tx="some.i18n.key"` from your components and use `text="Some Text"` instead
   (e.g. `<Text text="Some Text" />`

## Adding more languages

See the [i18n-js Documentation](https://github.com/fnando/i18n?tab=readme-ov-file#base-translations) to add languages to `app/i18n/i18n.ts`.
