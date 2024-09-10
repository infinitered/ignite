import * as Localization from "expo-localization"
import { I18nManager } from "react-native"
import * as i18next from "i18next"
import { initReactI18next } from "react-i18next"
import 'intl-pluralrules'

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import ar from "./ar"
import ko from "./ko"
import fr from "./fr"
import jp from "./jp"

// to use regional locales use { "en-US": enUS } etc
const fallbackLocale = "en-US"


export let i18n: i18next.i18n

export const initI18n = async () => {
  i18n = i18next.use(initReactI18next)

  await i18n.init({
    resources: {
      en,
      "en-US": en
    },
    lng: fallbackLocale,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

// console.log("i18next.languages 2")
// console.log(i18next.languages)

const systemLocale = Localization.getLocales()[0]
const systemLocaleTag = systemLocale?.languageTag ?? fallbackLocale

// if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
//   // if specific locales like en-FI or en-US is available, set it
//   i18n.locale = systemLocaleTag
// } else {
//   // otherwise try to fallback to the general locale (dropping the -XX suffix)
//   const generalLocale = systemLocaleTag.split("-")[0]
//   if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
//     i18n.locale = generalLocale
//   } else {
//     i18n.locale = fallbackLocale
//   }
// }

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
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, true>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, false>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
  IsFirstLevel extends boolean,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? IsFirstLevel extends true
    ? Text | `${Text}:${RecursiveKeyOfInner<TValue>}`
    : Text | `${Text}.${RecursiveKeyOfInner<TValue>}`
  : Text
