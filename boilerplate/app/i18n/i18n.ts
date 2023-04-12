import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import ar from "./ar"
import ko from "./ko"

i18n.fallbacks = true
i18n.translations = { ar, en, "en-US": en, ko }

const fallbackLocale = "en"
const systemLocale = Localization.locale

if (i18n.translations.hasOwnProperty(systemLocale)) {
  // if specific locales like en-FI or en-US is available, set it
  i18n.locale = systemLocale
} else {
  // otherwise try to fallback to the general locale (dropping the -XX suffix)
  // and trying
  const generalLocale = systemLocale.split("-")[0]
  if (i18n.translations.hasOwnProperty(generalLocale)) {
    i18n.locale = generalLocale
  } else {
    i18n.locale = fallbackLocale
  } 
}

// handle RTL languages
export const isRTL = Localization.isRTL
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
