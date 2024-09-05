import * as Localization from "expo-localization"
import { I18nManager } from "react-native"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import ar from "./ar"
import ko from "./ko"
import fr from "./fr"
import jp from "./jp"

// to use regional locales use { "en-US": enUS } etc
const fallbackLocale = "en-US"

export const i18n = i18next.createInstance()
i18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ar,
      en,
      "en-US": en,
      ko,
      fr,
      jp,
    },
    lng: fallbackLocale,
    fallbackLng: fallbackLocale,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

const systemLocale = Localization.getLocales()[0]
const systemLocaleTag = systemLocale?.languageTag ?? fallbackLocale

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
  // if specific locales like en-FI or en-US is available, set it
  i18n.locale = systemLocaleTag
} else {
  // otherwise try to fallback to the general locale (dropping the -XX suffix)
  const generalLocale = systemLocaleTag.split("-")[0]
  if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
    i18n.locale = generalLocale
  } else {
    i18n.locale = fallbackLocale
  }
}

// handle RTL languages
export const isRTL = systemLocale?.textDirection === "rtl"
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
