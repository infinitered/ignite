# Internationalization in Ignite Apps

Ignite currently setup to have Internationalization setup in English, Arabic, and Korean! This is detected on app load and will set your app to that language.

## RTL

Since Ignite already comes with an RTL language, Arabic, adding any new ones would work by default.

## Adding more languages

1. add you language `.json` file to `app/i18n/`, i.e. `app/i18n/fr.json`
2. update `app/i18n/i18n.ts` `i18n.translations` object to include the newly imported language, i.e. `i18n.translations = { en, "en-US": en, ja, fr }`
