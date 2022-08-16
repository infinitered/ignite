import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import ar from "./ar.json"
import en from "./en.json"
import ko from "./ko.json"

i18n.fallbacks = true
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = { ar, en, "en-US": en, ko }

i18n.locale = Localization.locale

// handle RTL languages
export const isRTL = Localization.isRTL
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

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
