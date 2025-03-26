// Note the syntax of these imports from the date-fns library.
// If you import with the syntax: import { format } from "date-fns" the ENTIRE library
// will be included in your production bundle (even if you only use one function).
// This is because react-native does not support tree-shaking.
import { type Locale } from "date-fns/locale"
import { format } from "date-fns/format"
import { parseISO } from "date-fns/parseISO"
import i18n from "i18next"

type Options = Parameters<typeof format>[2]

let dateFnsLocale: Locale
export const loadDateFnsLocale = () => {
  const primaryTag = i18n.language.split("-")[0]
  switch (primaryTag) {
    case "en":
      dateFnsLocale = require("date-fns/locale/en-US").default
      break
    case "ar":
      dateFnsLocale = require("date-fns/locale/ar").default
      break
    case "ko":
      dateFnsLocale = require("date-fns/locale/ko").default
      break
    case "es":
      dateFnsLocale = require("date-fns/locale/es").default
      break
    case "fr":
      dateFnsLocale = require("date-fns/locale/fr").default
      break
    case "hi":
      dateFnsLocale = require("date-fns/locale/hi").default
      break
    case "ja":
      dateFnsLocale = require("date-fns/locale/ja").default
      break
    default:
      dateFnsLocale = require("date-fns/locale/en-US").default
      break
  }
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const dateOptions = {
    ...options,
    locale: dateFnsLocale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}
