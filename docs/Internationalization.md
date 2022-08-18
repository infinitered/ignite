# Internationalization in Ignite Apps

Ignite currently setup to have Internationalization setup in English, Arabic, and Korean! This is detected on app load and will set your app to that language.

## Right to Left languages (RTL)

Since Ignite already comes with an RTL language, Arabic, adding any new ones would work by default.

NOTE: if you move between a RTL and non-RTL language, you'll have to relaunch your app twice to get the correct localization logic. This is an iOS only issue. An [issue](https://github.com/infinitered/ignite/issues/2025) has been logged with Ignite to find a potential solution.

### Removing RTL Support

To remove RTL support, follow the following steps:

1. `/app/i18n/i18n.ts`

- remove your RTL `.json` file from the `i18n.translations` object
- remove lines 19-21 where we allow and force RTL on the native layer

2. remove all other associated logic that uses the exported `isRTL` variable

## Adding more languages

1. add your language `.json` file to `app/i18n/`, e.g. `app/i18n/fr.json`
2. update `app/i18n/i18n.ts` `i18n.translations` object to include the newly imported language, e.g. `i18n.translations = { en, "en-US": en, ja, fr }`
