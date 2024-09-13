---
sidebar_position: 160
---

# Internationalization in Ignite Apps

Ignite is currently set up to support Internationalization in English, Arabic, Korean, French, Japanese and Hindi. This is detected on app load and will set your app to that language.

## Right to Left languages (RTL)

Since Ignite already comes with an RTL language, Arabic, adding any new ones would work by default.

### Removing RTL Support

To remove RTL support, follow the following steps:

1. In `/app/i18n/i18n.ts`

- Remove your RTL language imports
- Remove references to those language objects
- Remove lines where we allow and force RTL on the native layer

```ts
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)
```

2. Remove all other associated logic that uses the exported `isRTL` variable
3. Remove any `tx="some:i18n.key"` from your components and use `text="Some Text"` instead
   (e.g. `<Text text="Some Text" />`

## Adding more languages

See the [i18next Documentation](https://www.i18next.com/how-to/add-or-load-translations) to add languages to `app/i18n/i18n.ts`.
